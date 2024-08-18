import { Router } from "express";
import { body, oneOf, check } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import { createProudct, deleteProduct, getAllProducts, getProduct, updateProduct } from "./handlers/product";
import { createUpdate, deleteUpdate, getAllUpdates, getUpdate, updateUpdate } from "./handlers/update";
import { createUpdatePoint, deleteUpdatePoint, getAllUpdatePoints, getUpdatePoint, updateUpdatePoint } from "./handlers/updatepoint";

const router = Router();

router.get('/product', getAllProducts)
router.get('/product/:id', getProduct)
router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct)
router.post('/product',
    body('name').exists().isString(),
    handleInputErrors,
    createProudct)
router.delete('/product/:id', deleteProduct)

router.get('/update', body('productId').exists().isString(), getAllUpdates)
router.get('/update/:id', getUpdate)
router.put('/update/:id',
    body('title').optional().isString(),
    body('body').optional().isString(),
    oneOf([check('status').equals('IN_PROGRESS'), check('status').equals('SHIPPED'), check('status').equals('DEPRECATED')]),
    body('version').optional(),
    updateUpdate)
router.post('/update',
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    createUpdate)
router.delete('/update/:id', deleteUpdate)

router.get('/updatepoints', getAllUpdatePoints)
router.get('/updatepoints/:id', getUpdatePoint)
router.put('/updatepoints/:id',
    body('title').optional().isString(),
    body('description').optional().isString(),
    body('productId').exists().isString(),
    updateUpdatePoint)
router.post('/updatepoints',
    body('title').exists().isString(),
    body('description').exists().isString(),
    body('updateId').exists().isString(),
    createUpdatePoint)
router.delete('/updatepoints/:id', body('productId').exists().isString(), deleteUpdatePoint)

router.use((err, req, res, next) => {
    console.log(err)
    res.json({ message: "Something unexpected happened in router handler" })
})

export default router;