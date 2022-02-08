const knex = require('../knex_base');
const pg = require('../pg_base');

class GoodsController {
    async addGoods(req, res) {
        try {
            await knex('goods').insert(req.body);
            res.status(201).json({});
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }

    async updateGoods(req, res) {
        try {
            await knex('goods').where('id', +req.params.id).update(req.body);
            const result = await knex('goods').where({id: +req.params.id}).first();
            res.status(200).json(result);
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }

    async deleteGoods(req, res) {
        try {
            const result = await knex('goods').where({id: +req.params.id}).del();
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

    async getGoodsByCategory(req, res) {
        try {
            const result = await knex('goods')
                .leftJoin('categories', 'goods.category_id', 'categories.id')
                .select('goods.name', knex.raw('SUM(goods.count)'), 'goods.category_id', knex.raw('coalesce(categories.name, \'\') AS c_name'))
                .where({
                    'goods.active': 1,
                    'goods.category_id': +req.params.categoryId
                })
                .groupBy('goods.name', 'goods.category_id', 'c_name')

            res.status(200).json(result);
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }

    getGroupedGoods(req, res) {
        try {
            const query = `WITH temp(g_name, c_name, parent_id) AS (
                SELECT g.name, c.name, c.parent_id
                FROM goods g
                         INNER JOIN categories c ON g.category_id = c.id
                WHERE g.active = 1
            )
                           SELECT temp.g_name, temp.c_name, coalesce(c.name, '') AS parent_name
                           FROM temp
                                    LEFT JOIN categories c ON temp.parent_id = c.id
                           ORDER BY parent_name `;
            pg.query(query, [], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        message: 'Internal server error'
                    });
                }
                if(result){
                    res.status(200).json(result.rows);
                }else{
                    res.status(200).json([]);
                }
            });
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }
}

module.exports = new GoodsController();