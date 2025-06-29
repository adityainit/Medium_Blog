import { useRef, useState } from "react"

import type { CreateBlogInput } from "@ad-mohankduo23/mediumblog-common"
import axios from "axios"
import {  useNavigate, useParams } from "react-router-dom"

import { Loader2 } from "./Loader"
import { BACKEND_URL } from "@/config"

interface editProps {
    type?: string
}

export function Edit(props:editProps) {

    const navigate = useNavigate();



    const [postInputs,setPostInputs] = useState<CreateBlogInput>({
        title:"",
        content:"",
        imgUrl:""
    })


    const titleRef = useRef(null)
    const contentRef = useRef(null)

    const fileInputRef = useRef(null);
    const [imagePreview,setImagePreview] = useState<string | null>(null);

    

    function triggerFileInput() {
        //@ts-ignore
        fileInputRef.current?.click()
    }

    function handleAutoResize(ref : any) {
        const el = ref.current ;
        //@ts-ignore
        el.style.height = "auto";
        //@ts-ignore
        el.style.height = `${el.scrollHeight}px`;
    }

    function handleTitleKeyDown(e : any) {
        if(e.key === "Enter") {
            e.preventDefault();
            //@ts-ignore
            contentRef.current?.focus()
        }
    }
    function removeImage() {
        setImagePreview(null);
        //@ts-ignore
        fileInputRef.current.value = null
    }

    async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true); 

        try {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "medium_default");
            data.append("cloud_name", "dx2fcn6ru");

            const response = await axios.post("https://api.cloudinary.com/v1_1/dx2fcn6ru/image/upload", data);
            const imageUrl = response.data.url;

            setPostInputs({
            ...postInputs,
            imgUrl: imageUrl
            });

            setImagePreview(imageUrl); 
        } catch (err) {
            alert("Image upload failed. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
}



    async function sendPostReq() {
        
        const response = await axios.post(`${BACKEND_URL}/api/v1/blog` , postInputs , {
            headers: {
                Authorization : localStorage.getItem("token")
            }
        })

        console.log(response)
        
        if(response) {
            navigate(`/blog/${response.data.id}`)
        }
        
    }

    const {id} = useParams()

    async function sendPutReq() {
        const res = await axios.put(`${BACKEND_URL}/api/v1/blog` , {
            ...postInputs,
            id
        } , {
            headers : {
                Authorization : localStorage.getItem("token")
            }
        });

        console.log(res)
    }

    const [loading,setLoading] = useState(false)


    
    return <div className="flex justify-center py-5">
        <div className="w-[90%] md:w-[70%] flex flex-col gap-1">

            <div >
                <textarea ref={titleRef} 
                 onInput={() => handleAutoResize(titleRef)}
                 onKeyDown={handleTitleKeyDown}
                 onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        title:e.target.value
                    })
                 }}
                 rows={1} placeholder="Title" className="w-[100%] text-gray-500 focus:outline-none md:text-5xl text-4xl font-semibold md:text-3xl leading-snug py-2 " />
            </div>

            <div>
                <div>
                    <textarea 
                    onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            content:e.target.value
                        })
                    }}
                    ref={contentRef}
                    onInput={() => handleAutoResize(contentRef)}
                     className="w-full focus:outline-none  text-lg md:text-xl text-gray-600 leading-snug text-justify" placeholder="Tell Your Story..."/>
                </div>
            </div>

            <div className="">
                {/*image section */}

                <input type="file" 
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleImageChange}
                />

                <div onClick={triggerFileInput} className="mb-3 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>

                </div>

                {loading ? (
                    <div className="mb-3">
                        <Loader2 />
                    </div>
                    ) : imagePreview ? (
                    <div className="mb-3">
                        <div onClick={removeImage} className="flex cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        </div>
                        <img className="w-[1000px] h-full object-cover object-center" src={imagePreview} />
                    </div>
                    ) : null}


                {props.type == "edit" ?<div>
                    <button onClick={sendPutReq} className="bg-rose-700 text-sm text-white font-bold hover:bg-green-700 px-2 py-1 rounded-full cursor-pointer">Confirm Edit</button>
                </div> : <div>
                        <button onClick={sendPostReq} className="bg-green-600 text-sm text-white font-bold hover:bg-green-700 px-2 py-1 rounded-full cursor-pointer">Publish Blog</button>
                    </div>}

            </div>
        </div>
    </div>
}