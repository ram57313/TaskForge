import { useState } from "react"

// import Hyperspeed from "../components/hyperspeed/hyperspeed"
// import { hyperspeedPresets } from "../components/hyperspeed/HyperSpeedPresets"
import "./signup.css"
import {FaEye,FaEyeSlash} from "react-icons/fa"
import {NavLink} from "react-router-dom"

function signin(){
 
}

export default function Signup(){
    const [showPassword,setShowPassword]=useState(false);
    const [email,setEmail]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    return (
        // <div className="signupPage">

            <div className="signupCard">
                <h3 className="signup">SIGNUP</h3>

                <div className="inputs">    
                    <div>
                    <p className="username">UserName</p>
                    <input type="text" placeholder="Enter Username" onChange={(e)=>{
                        setUsername(e.target.value)
                    }}/>
                    {console.log(username)}

                    </div>
                    
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
                    <NavLink to="/dashboard"><button id="button" onSubmit={()=>signin()}>SignIn</button></NavLink>
                </div>
                <p id="bottom">Already have an account?<NavLink to="/login" ><span id="login">Login</span></NavLink></p>
            </div>
        // </div>
    )
}