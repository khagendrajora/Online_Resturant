const Item = require('../models/Product')
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
        cloud_name: 'dwepmpy6w', 
        api_key: '934775798563485', 
        api_secret: '0fc2bZa8Pv7Vy22Ji7AhCjD0ErA' // Click 'View API Keys' above to copy your API secret
    });

exports.ItemUpload = async (req, res) => {
    try {
        
       if (!req.files || !req.files.item_image) {
            return res.status(400).json({ message: "No image uploaded" });
        }
    const file = req.files.item_image.tempFilePath
        const result = await cloudinary.uploader.upload(file, {
              folder: "items",
            use_filename: true,
            unique_filename: false
        })
        
        console.log(result)

         let item = new Item({
        item_name: req.body.item_name,
        item_category: req.body.item_category,
        item_description: req.body.item_description,
        item_image: result.secure_url,
        item_price: req.body.item_price,
    })
    await item.save()
   
    res.send(item)
    
        }catch (err) {
            console.log(err)
        }
}

//itemDetails

exports.itemDetails = async (req, res) => {
    const item = await Item.findById(req.params.id)
    if (!item) {
        return res.status(400).json({ error: "invalid" })
    }
    res.send(item)
}


//fetch all data 
exports.itemList = async (req, res) => {
    const item = await Item.find()

    if (!item) {
        return res.status(400).json({ error: 'invalid' })
    }
    res.send(item)
}

//update Item
exports.updateItem = async (req, res) => {
    const item = await Item.findByIdAndUpdate(req.params.id, {
        item_name: req.body.item_name,
        item_category: req.body.item_category,
        item_description: req.body.item_description,
        item_price: req.body.item_price,
        item_image: req.file.path
    },
        { new: true }
    )
    if (!item) {
        return res.status(400).json({ error: 'upadate failed' })
    }
    res.send(item)
}


//delete item
exports.deleteItem = async (req, res) => {
    const id = req.params.id
    Item.findByIdAndDelete(id)
        .then((item) => {
            if (!item) {
                return res.status(403).json({ error: 'item not found' })
            }
            else {
                return res.status(200).json({ message: 'item deleted' })
            }
        }).catch(err => {
            return res.status(400).json({ error: err })
        })
}

