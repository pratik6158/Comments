import { nanoid } from "nanoid";
import React, { useContext, useEffect, useState } from "react";
const AppConetxt=React.createContext()

const AppProvider=({children})=>{
    const [loading,setLoading]=useState(false)
    const [renderDataRaw,setRenderData]=useState([])
    const data=[]
    const [stopLevel,setStopLevel]=useState(-1)
    const [renderAhead,setRenderAhead]=useState(true)
    const printPreOrder=(root,comments,depth)=>{
    if(!root.children){
      return
    }
    data.push({"comment":root.comment,"depth":depth,"showNext":true,"id":root.id})
    for(var i=0;i<root.children.length;i++){
      printPreOrder(comments.find(comment=>{
        if(comment.id===root.children[i]){
          return comment
        }
      }),comments,depth+1)
    }
  }

  const fetchData=async()=>{
    setLoading(true)
    const res=await fetch("http://localhost:3000/api/")
    const {comments}=await res.json()
    // console.log(comments.comments)
    // console.log(comments)
    printPreOrder(comments.find(comment=>{
      if(comment.parentId==="#0"){
        return comment
      }
    }),comments,0)
    setRenderData(data)
    setLoading(false)
  }
  useEffect(()=>{
      fetchData()
  },[])

  return (
    <AppConetxt.Provider
        value={{
            loading,
            renderDataRaw,
            setRenderData,
            stopLevel,
            setStopLevel,
            renderAhead,
            setRenderAhead
            
        }}
    >
        {children}
    </AppConetxt.Provider>

  )

}


export const useGlobalContext=()=>{
    return useContext(AppConetxt)
}

export {AppConetxt,AppProvider}