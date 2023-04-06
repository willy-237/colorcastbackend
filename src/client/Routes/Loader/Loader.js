import React, { useEffect, useState } from "react";
import "./Loader.css";
import { useNavigate } from "react-router-dom";

function Animation (){
    return(
        <>
          <div id="loader">
              <div id="shadow"></div>
              <div id="box"></div>
          </div>
          <div className="last">Loader #6</div>
        </>
    )
}
function Loader(){
    const [animation, setAnimation] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() =>{
            navigate("/tours")
        }, 2000)
        
    })

    return(
        <>
         {
            animation ? <div>Hello World</div> : <Animation /> 
         }
        </>
    )
}

export default Loader;