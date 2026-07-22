import { useState } from "react"
import { FiMenu } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import "./dashboard.css";

export default function Dashboard(){
      const [open,setOpen]=useState(false);
      const [isCollapsed,setIsCollapsed]=useState(true);
      
    return <div className={isCollapsed?"maindiv":"maindiv-expanded"}>
          <div className="sidebar">
            <div id="toggler-box">
                  <button id="toggler" onClick={()=>{
                        setOpen(!open);
                        setIsCollapsed(!isCollapsed);
                  }}>{open?<FiX />:<FiMenu />}</button>
            </div>
            
          </div>
          <div className="taskcards">
                TASKCARDS
          </div>
    </div>
}