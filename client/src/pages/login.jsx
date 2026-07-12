import { useState } from "react"

// import Hyperspeed from "../components/hyperspeed/hyperspeed"
// import { hyperspeedPresets } from "../components/hyperspeed/HyperSpeedPresets"
import "./login.css"
import {FaEye,FaEyeSlash} from "react-icons/fa"
import {NavLink} from "react-router-dom"



export default function Login(){
    const [showPassword,setShowPassword]=useState(false);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    function login(){

    }

    return (
        <div className="loginPage">

            <div className="loginCard">
                <h3 className="login">LOGIN</h3>

                <div className="inputs">    
                    
                    <div >
                    <p className="email">Email</p>
                    <input type="email" placeholder="Enter The Email"  onChange={(e)=>{
                        setEmail(e.target.value)
                    }}/>
                    {console.log(email)}
                    </div>

                    <div className="passwordBox">
                    <p className="passwordText">Password</p>
                    <input  type={!showPassword?"password":"text"} placeholder="Enter Your Password "  onChange={(e)=>{
                        setPassword(e.target.value)
                    }} />
                    {console.log(password)}

                    <span id="eye" onClick={()=>{setShowPassword(!showPassword)}}>{!showPassword?<FaEye/>:<FaEyeSlash/>}</span>
                    </div>
                </div>

                <div className="buttonBox">
                    <NavLink to="/dashboard"><button id="button" onClick={()=>login()}>Login</button></NavLink>
                </div>

            </div>
        </div>
    )
}