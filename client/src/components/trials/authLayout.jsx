import { Outlet } from "react-router-dom"
import Hyperspeed from "../hyperspeed/hyperspeed"
import { hyperspeedPresets } from "../hyperspeed/HyperSpeedPresets"
import "./authLayout.css"

export default function AuthLayout(){
    return (
        <div>
            <div className="background">
             <Hyperspeed effectOptions={hyperspeedPresets.four}/>
            </div>
         
         <Outlet/>
        </div>
    )
}