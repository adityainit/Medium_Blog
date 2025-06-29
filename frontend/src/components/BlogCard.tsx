import { BACKEND_URL } from "@/config"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export interface blogProps {
    author : {
        username:string,
        email?:string
    }
    title:string
    content:string
    publishedData: any
    id:string
    imgUrl?:string
    type?:string

}



export function BlogCard(props : blogProps) {

    const [length,setLength] = useState(false);

    const navigate = useNavigate();

    const formattedData = new Date(props.publishedData).toLocaleDateString("en-US" , {
        year:"numeric",
        month:"long",
        day:"numeric"
    })

    function blogHandler() {
        navigate(`/blog/${props.id}`)
    }

    async function deleteHandler() {
        await axios.delete(`${BACKEND_URL}/api/v1/blog/${props.id}` , {
            headers : {
                Authorization: localStorage.getItem("token")
            }
        })
         window.location.reload()       


    }

    function editHandler() {
        navigate(`/edit/${props.id}`)
    }


    return <div className="flex  justify-center mt-10  " >
        <div className="w-[90%] md:w-[70%] flex flex-col gap-2 border-b border-slate-400 pb-2">

            <div className="flex items-center gap-2">
                <div className="relative inline-flex items-center justify-center md:w-10 md:h-10 md:text-xl w-8 h-8 overflow-hidden bg-gray-300 rounded-full ">
                    <span className="font-medium text-gray-600 ">{props.author.username[0]}</span>
                </div>
                <div className="font-medium">{props.author.username} -</div>
                <div className="text-sm text-gray-500">{formattedData}</div>
            </div>

            <div className={`${props.imgUrl ?  `grid grid-cols-5 ` : ``}`}>

                <div className="grid col-span-3">
                    <div className="font-bold md:text-2xl ">
                        {props.title}
                    </div>

                    <div className="gap-2 text-gray-700 text-sm md:text-lg font-semibold items-center">
                        {props.content.length < 120 || length
                            ? props.content
                            : props.content.slice(0, 120) + "..."}

                        {props.content.length > 120 && (
                            <a
                            className="cursor-pointer text-black font-normal ml-1 underline text-sm"
                            onClick={() => setLength(prev => !prev)}
                            >
                            {length ? "see less" : "see more"}
                            </a>
                        )}
                    </div>
                </div>

                {props.imgUrl && <div className="grid col-span-2 justify-end items-center">
                    <img className="h-20 md:h-30 object-cover object-center w-30 md:w-50" src={props.imgUrl} alt="" />
                </div>}

            </div>

            <div className="flex items-center  gap-3">
                <div className="text-sm">{`${Math.ceil(props.content.length/100)} min read`}</div>

                <div>
                    <button onClick={blogHandler} className="cursor-pointer flex items-center text-sm bg-gray-200 px-2 py-1 rounded-full">

                        Expand
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                        
                    </button>
                </div>

                {props.type == "delete" ? <div >
                    <button className="cursor-pointer flex items-center text-sm bg-gray-200 px-2 py-1 rounded-full" 
                        onClick={deleteHandler}
                    >
                        
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                        Delete

                    </button>
                </div> : null}

                {props.type == "delete" ? <div>
                    <button className="cursor-pointer flex items-center text-sm bg-gray-200 px-2 py-1 rounded-full"
                        onClick={editHandler}
                    >
                        Edit
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 ml-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>

                    </button>
                </div> : null}
            </div>
            
        </div> 
    </div>
}


