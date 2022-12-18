const mongoose = require('mongoose')

const CommentSchema=new mongoose.Schema({
    id:{
        type:String,
        require:[true,'ID is required']
    },
    comment:{
        type:String,
        require:[true,"Comment is empty"]
    },
    children:{
        type:Array
    },
    parentId:{
        type:String
    }
})


module.exports=mongoose.model('Comment',CommentSchema)