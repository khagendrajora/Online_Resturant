const express = require('express')
const router = express.Router()
const { ItemUpload, itemDetails, itemList, deleteItem, updateItem } = require('../controllers/ItemController')

const { requireAdmin } = require('../controllers/UserController')
const upload = require('../middleware/fileUpload')
const fileUpload = require('express-fileupload');

router.post('/itemupload', fileUpload(), ItemUpload)

router.get('/itemdetails/:id', itemDetails)
router.get('/itemlist', itemList)
router.delete('/deleteitem/:id', deleteItem)
router.put('/itemupdate/:id', upload.single('item_image'), updateItem)

module.exports = router