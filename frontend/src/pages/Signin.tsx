import type { SigninInput,  } from "@ad-mohankduo23/mediumblog-common";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { PasswordInputBox } from "../components/InputBox";
import { Quote } from "../components/Quote";
import { BelowHeading, Heading } from "../components/Texts";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Loader } from "@/components/Loader";



export function Signin() {

    const [loading,setLoading] = useState(false);

    

    const navigate = useNavigate();

    const [postInputs,setPostInputs] = useState<SigninInput>({
            email:"",
            password:"",
        })

    
    async function sendRequest() {
        try{
            setLoading(true)
            const response = axios.post(`${BACKEND_URL}/api/v1/user/signin`,postInputs);
            const token = (await response).data.jwt;
            localStorage.setItem("token",token);
            setLoading(false)
            navigate("/blogs")
        } catch(e) {
            setLoading(false)
            alert("request failed try again")
        }
        
    }

    return <>

        {loading ? <Loader/> :<div className="md:grid md:grid-cols-2">

        
        
        <div className="flex justify-center h-screen ">
            <div className="flex flex-col justify-center gap-2">
                <div className="flex flex-col ">
                    <Heading text="Sign In to Your Account"/>
                    <BelowHeading text="Don't have an account?" onClick={()=> {navigate("/")}} link="Sign Up"/>
                </div>

                <InputBox  onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        email:e.target.value
                    })
                }} label="Email" placeholder="example@gmail.com"/>

                <PasswordInputBox  onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        password:e.target.value
                    })
                }} label="Password" placeholder="" 
                endIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>} 

                endIcon2={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5 ">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>}/>

                <Button onClick={sendRequest}  label="Sign In"/>
            </div>
        </div>
        
        <Quote quote="The customer service I recieved was exceptional. The support team went above and beyond to adress my concers." author="Jules Winnfield" designation="CEO, Acme Inc"/>
    </div>}
    </>
}