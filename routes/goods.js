const router = require('express').Router();
const goodsController = require('../controllers/goods');
const {body, validationResult} = require('express-validator');

router.post('/add',
    body('category_id').isInt().isLength({min: 1}),
    body('name').isString().trim().isLength({min: 1}),
    body('active').isInt({min: 0, max: 1}).isLength({max: 1}),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        await goodsController.addGoods(req, res);
    }
)

router.put('/update/:id', async (req, res) => {
    await goodsController.updateGoods(req, res);
})

router.delete('/delete/:id', async (req, res) => {
    await goodsController.deleteGoods(req, res);
})

router.get('/bycategory/:categoryId', async (req, res) => {
    await goodsController.getGoodsByCategory(req, res);
})

router.get('/grouped', (req, res) => {
    goodsController.getGroupedGoods(req, res);
})

module.exports = router