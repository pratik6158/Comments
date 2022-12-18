import React, { useEffect } from 'react'
import axios from 'axios'

let data=[]

const printPreOrder=(root,comments,depth)=>{
  if(!root.children){
    return
  }
  data.push({"comment":root.comment,"depth":depth})
  for(var i=0;i<root.children.length;i++){
    printPreOrder(comments.find(comment=>{
      if(comment.id===root.children[i]){
        return comment
      }
    }),comments,depth+1)
  }
}
const App =()=> {
  useEffect(()=>{
    axios("http://localhost:3000/api/").then(({data})=>{
      return data.comments
    }).then(comments=>{
      printPreOrder(comments.find(comment=>{
        if(comment.parentId==="#0"){
          return comment
        }
      }),comments,0)
    })
  },[])
  console.log(data)
  return (
    <div>{
      data.map(comment=>{
        return<div>hello</div>
      })
    
    }</div>
  )
}

export default App