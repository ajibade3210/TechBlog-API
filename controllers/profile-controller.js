const User = require("../models/user");
const paginate = require("express-paginate");

const updateOne = async(req, res) => {
    try {
        await User.findByIdAndUpdate(req.param.id, req.body);
        return res.status(201).json({
            message: "Item Successfully Updated",
            success: true,
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        })
    }
}

const getOne = async(req, res) => {
    try {
        const item = await User.findById(req.param.id);
        if(item) {
            return res.status(200).json(item);
        }
        return res.status(404).json({
            message: "Item Not Found",
            success: false,
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        })
    }
}

module.exports = {
    updateOne,
    getOne
}