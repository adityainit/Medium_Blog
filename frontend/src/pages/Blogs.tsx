import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { BlogCard,  } from "../components/BlogCard";
import axios from "axios";

import type { blogProps } from "../components/BlogCard";

import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { BACKEND_URL } from "@/config";

 
export function Blogs() {

    const [loading,setLoading] = useState(true)

    const [blogs,setBlogs] = useState<blogProps[]>([]);

    useEffect(() => {
        async function fetchBlogs() {

            setLoading(true)
            
            const blogs = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk` , {
                headers :{
                    Authorization: localStorage.getItem("token")
                }
            })

            setBlogs(blogs.data.blogs)
            console.log(blogs.data)
            setLoading(false)
        }

        fetchBlogs()
    },[])




    return <div className="">

        <Appbar/>

        {loading ? <div className="mt-5"><Skeleton className="mt-2 "  count={20}/></div> : null}

        
        <div className="">
            {blogs.map(blog => <BlogCard type="expand" title={blog.title} content={blog.content} author={blog.author} publishedData={blog.publishedData} id={blog.id} imgUrl={blog.imgUrl}/>)}
        </div>

        
    </div>
}





            