import { useParams } from "react-router-dom"
import { Appbar } from "../components/Appbar"
import { useEffect, useState } from "react"

import axios from "axios"

import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

import type { blogProps } from "../components/BlogCard";
import { FullBlog } from "../components/FullBlog";
import { BACKEND_URL } from "@/config";

export function Blog() {

    const {id} = useParams()
    const [loading,setLoading] = useState(true)
    const [blog,setBlog] = useState<blogProps[]>([])


    useEffect(() => {
        async function fetchBlog() {
            setLoading(true)
            const blog = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}` , {
                headers: {
                    Authorization : localStorage.getItem("token")
                }
            })

            setBlog(prev => ([...prev,blog.data.blog]))
            setLoading(false)
        }

        fetchBlog()
    },[])

    return <div>
        <Appbar />

        

        {loading? <div className="mt-5"><Skeleton className="mt-2" count={8}/></div> : null}

        {blog.map(b => <FullBlog title={b.title} content={b.content} author={b.author} publishedData={b.publishedData} id={b.id} 
        //@ts-ignore
        imgUrl={b.imgUrl} email={b.email}/>)}
        
    </div>
}