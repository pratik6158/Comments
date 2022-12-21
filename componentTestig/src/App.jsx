import React, { useState } from "react";
import { useGlobalContext } from "./context";
import { nanoid } from "nanoid";
import { render } from "react-dom";

const App = () => {
    const { loading, renderDataRaw,setRenderData } = useGlobalContext();
    if (loading) {
        return <h1>Loading</h1>;
    }
    const handleExpandButton=(id)=>{
      setRenderData(
        renderDataRaw.map(each=>{
          if(each.id==id){
            return{
              ...each,
              showNext:false
            }
          }else{
            return each
          }
        })
      )
    }
    
    let renderAhead=true
    let stopLevel=-1
    const renderData=renderDataRaw.map((each) => {
      if(each.showNext===false){
        renderAhead=false
        stopLevel=(each.depth)
      }
      console.log(stopLevel)
      if(!renderAhead){
        if(each.depth<=stopLevel){
          renderAhead=true
        }
        return
        (
          <div>hello</div>
        )
      }
      if(renderAhead){
        return (
          <div key={nanoid()} style={{'display':'flex'}}>
            <button onClick={()=>{handleExpandButton(each.id)}}>+</button>
            <div key={nanoid()} style={{"marginLeft":`${each.depth*20}px`}}>{each.comment}</div>
          </div>
        )
      }
    })
    console.log(renderData)
    return (
        <div>
            {renderData}
        </div>
    );
};

export default App;
