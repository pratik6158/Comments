/*
1>to add a comment
2>Get all the comment

rest like delete edit and modify will be added later
*/


const express=require('express')
const router=express.Router()

const{
    addCommnet,
    getAllComments
}=require('../controller/commentController')

router.post('/',addCommnet)
router.get('/',getAllComments)


module.exports=router