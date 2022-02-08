const knex = require('../knex_base');
const pg = require('../pg_base');

class CategoriesController {
    getActiveCategories(req, res) {
        try {
            const query = `WITH RECURSIVE res(id, parent_id, name, level, cnt) as (
                SELECT c1.id, c1.parent_id, c1.name, c1.level, coalesce(SUM(g1.count), 0) AS cnt
                FROM categories c1
                         LEFT JOIN goods g1 ON c1.id = g1.category_id
                WHERE c1.active = 1
                GROUP BY c1.id, c1.parent_id, c1.name, c1.level
                UNION
                SELECT c2.id, c2.parent_id, c2.name, c2.level, coalesce(res.cnt, 0)
                FROM categories c2
                         INNER JOIN res ON (res.parent_id = c2.id)
                         LEFT JOIN goods g2 ON c2.id = g2.category_id
            )

                           SELECT id, parent_id, name, level, SUM(cnt)
                           FROM res
                           GROUP BY id, parent_id, name, level
                           ORDER BY level, parent_id, id`;
            pg.query(query, [], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        message: 'Internal server error'
                    });
                }
                res.status(200).json(result.rows);
            });
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }

    async addCategory(req, res) {
        try {
            if (req.body.parent_id) {
                const result = await knex('categories').select('level').where({id: req.body.parent_id}).first();
                if (result) {
                    req.body.level = result.level + 1;
                } else {
                    return res.status(422).json({error: `Category with id ${req.body.parent_id} not found`});
                }
            } else {
                req.body.level = 1;
            }
            await knex('categories').insert(req.body);
            res.status(201).json({});
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: 'Internal server error'
            })
        }

    }

    async updateCategory(req, res) {
        try {
            if (req.body.level && req.body.level !== 1) {
                return res.status(400).json('Level can not changed')
            }

            if (req.body.parent_id === null) {
                req.body.level = 1;
            }

            if (req.body.level === 1) {
                req.body.parent_id = null;
            }

            if (req.body.parent_id) {
                const result = await knex('categories').select('level').where({id: req.body.parent_id}).first();
                if (result) {
                    req.body.level = result.level + 1;
                } else {
                    return res.status(422).json({error: `Category with id ${req.body.parent_id} not found`});
                }
            }

            await knex('categories').where('id', +req.params.id).update(req.body);
            const result = await knex('categories').where({id: +req.params.id}).first();
            res.status(200).json(result);
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }

    async deleteCategory(req, res) {
        try {
            const id = +req.params.id;

            const goodsInCategory = await knex('goods').select('id').where({category_id: id});
            if (goodsInCategory.length) {
                return res.status(400).json({message: 'It is not possible to delete a category. There are products in the category.'});
            }

            let result = 0;
            const childCategories = await knex('categories').select('id').where({parent_id: id});
            if (childCategories.length) {
                const trx = await knex.transaction();
                try {
                    for (const element of childCategories) {
                        await knex('categories').where({id: element.id}).update({parent_id: null}).transacting(trx);
                    }
                    result = await knex('categories').where({id}).del().transacting(trx);
                    await trx.commit();
                } catch (e) {
                    await trx.rollback();
                    console.log(e);
                    return res.status(500).json({
                        message: 'Internal server error'
                    })

                }
            }else{
                result = await knex('categories').where({id}).del();
            }
            res.status(200).json({
                delete: result
            })
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }
}

module.exports = new CategoriesController()