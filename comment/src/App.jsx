import React, { useEffect,useState } from 'react'
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
  const [loading,setLoading]=useState(false)
  useEffect(()=>{
    setLoading(true)
    axios("http://localhost:3000/api/").then(({data})=>{
      return data.comments
    }).then(comments=>{
      printPreOrder(comments.find(comment=>{
        if(comment.parentId==="#0"){
          return comment
        }
      }),comments,0)
    })
    setLoading(false)
  },[])

  if(loading){
    return(
      <div>Loading</div>
    )
  }
  console.log(data)
  const test=[1,2,3,4,5,6]
  console.log(test)
  const dataRender=data.map(each=>{
    console.log(each)
    return <div>{each}</div>
  })
  return (
    <div>{
      dataRender
    }</div>
  )
}

export default App