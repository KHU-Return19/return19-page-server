const express = require('express')
const router = express.Router()
const { User } = require("../models/user")
const { Board } = require("../models/study")

router.get('/ongoing', (req, res, next) => {
    Study.find({}, function(err, study){
        let list = Board.find()
        return res.status(200).json({ data: list })
    })
})