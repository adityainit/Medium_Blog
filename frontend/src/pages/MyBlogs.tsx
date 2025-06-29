import { Appbar } from "@/components/Appbar";
import { BlogCard } from "@/components/BlogCard";
import axios from "axios";
import { useEffect, useState } from "react";

import type { blogProps } from "@/components/BlogCard";

import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { BACKEND_URL } from "@/config";


export function MyBlogs() {

    const [blogs,setBlogs] = useState<blogProps[]>([]);

    const [loading ,setLoading] = useState(true);

    useEffect(()=> {
        async function fetchBlogs() {
            setLoading(true)
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/myBlogs` , {
                headers :{
                    Authorization: localStorage.getItem("token")
                }
            })

            setBlogs(response.data.blogs) 
            setLoading(false)
        }
        fetchBlogs()
    },[])
    
    return <div>
        <Appbar/>


        {loading ? <div className="mt-5"><Skeleton className="mt-2 "  count={20}/></div> : null}



        <div className="flex flex-col">
            {blogs.map(blog => <BlogCard type="delete"  title={blog.title} content={blog.content} author={blog.author} publishedData={blog.publishedData} id={blog.id} imgUrl={blog.imgUrl} />)}
        </div>


    </div>
}