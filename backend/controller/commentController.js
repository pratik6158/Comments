const COMMENT=require('../models/comment')

const addCommnet=async(req,res)=>{
    try{
        const comment=await COMMENT.create(req.body)
        try{
            var rootCommentData= await COMMENT.findOne({id:`${req.body.parentId}`})
            if(!rootCommentData){
                console.log("Failed to get data -> CommentController.js 9")
            }else{
                const rootComment=await COMMENT.updateOne({id:`${req.body.parentId}`},{
                    $set:{
                        "children":[...rootCommentData.children,req.body.id]
                    }
                })
            }
        }catch(err){
            console.log(err)
        }
        console.log(req.body)
        res.status(201).json({Comment:comment})
    }catch(err){
        res.status(500).json({msg:err})
    }
}

const getAllComments=async(req,res)=>{
    try{
        const comments=await COMMENT.find({})
        res.status(200).json({comments})
    }catch(err){
        res.status(500).json({msg:err})
    }
}




module.exports={
    addCommnet,
    getAllComments
}