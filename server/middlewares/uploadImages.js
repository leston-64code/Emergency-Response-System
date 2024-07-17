const multer = require("multer")
const sharp = require("sharp")
const path = require("path")

const userStorage = multer.diskStorage({

    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "../public/images"))
    },

    filename: function (req, file, callback) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        callback(null, file.fieldname + "." + uniqueSuffix + ".jpeg")
    }

})


const userFilter = (req, file, callback) => {

    if (file.mimetype.startsWith("image")) {
        callback(null, true)
    } else {
        callback({
            message: "Unsupported file format"
        }, false)
    }

}

const uploadPhotos = multer({
    storage: userStorage,
    fileFilter: userFilter,
    limits: { fieldSize: 2000000 }
})


const productImgResize = async (req, res, next) => {
    if (!req.files) {
        return next()
    } else {
        await Promise.all(req.files.map(async (file) => {
            await sharp(file.path).resize(300, 300).toFormat("jpeg").jpeg({
                quality: 90
            }).toFile(`./public/images/products/${file.filename}`)
        }))
        next()
    }
}

const blogImgResize = async (req, res, next) => {
    if (!req.files) {
        return next()
    } else {
        await Promise.all(req.files.map(async (file) => {
            await sharp(file.path).resize(300, 300).toFormat("jpeg").jpeg({
                quality: 90
            }).toFile(`public/images/blogs/${file.filename}`)
        }))
        next()
    }
}

module.exports = { uploadPhotos, productImgResize, blogImgResize }