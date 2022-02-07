const router = require('express').Router();
const categoriesController = require('../controllers/categories');
const {body, validationResult} = require('express-validator');

router.get('/heartbeat', (req, res) => {
    return res.status(200).json({message:'Heart beat!'});
})

//Получение списка категорий
router.get('/', async (req, res) => {
    try {
        categoriesController.getActiveCategories(req, res);
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
})

//Добавление категории
router.post('/add',
    body('name').isString().isLength({min: 1}),
    body('active').isNumeric().isLength({max: 1}),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        await categoriesController.addCategory(req, res);
    })

//Изменение категории
router.put('/update/:id',
    body('name').isString().isLength({min: 1}),
    body('active').isNumeric().isLength({max: 1}), async (req, res) => {
        await categoriesController.updateCategory(req, res);
    })

//Удаление категории
router.delete('/delete/:id', async (req, res) => {
    await categoriesController.deleteCategory(req, res);
})

module.exports = router