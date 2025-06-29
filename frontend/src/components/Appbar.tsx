import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Avatar } from "./Avatar";
import { BACKEND_URL } from "@/config";



interface appBarProps {
    type?:string
}


export function Appbar(props:appBarProps) {

    const navigate = useNavigate();

    const [username,setUsername] = useState("")

    useEffect(() => {
        async function fetchUser() {
            const user = await axios.get(`${BACKEND_URL}/api/v1/user` , {
                headers :{
                    Authorization: localStorage.getItem("token")
                }
            })

            const username1 = user.data.userDetails.username;
            setUsername(username1)
        }
        fetchUser()
    },[])

    function closeHandler() {
        navigate("/blogs")
    }

    return <div className=" flex justify-center border-b border-slate-300 py-2">
        <div className="flex items-center justify-between w-[90%] md:w-[97%]">

            <div className="flex md:items-end gap-5">
                <div onClick={() => {navigate("/blogs")}} className="text-2xl md:text-3xl font-bold cursor-pointer">Medium</div>

                <div className="hidden md:block ">
                    <input className="w-[250px] focus:outline-none border border-gray-700 rounded-full px-2 py-[2px]" type="text" placeholder="Search"/>
                    

                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                </div>

                {props.type == "single" ? <div className="cursor-pointer" onClick={closeHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div> :

                <div className="flex items-center text-gray-700 hover:text-black cursor-pointer" onClick={() => {
                    navigate("/write")
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    <span className="hidden md:block">Write</span>

                </div>}


                


                <Avatar username={username}/>


            </div>
        </div>
    </div>
}

