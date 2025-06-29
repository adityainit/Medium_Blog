import type { blogProps } from "./BlogCard";



export function FullBlog(props : blogProps) {

    const formattedData = new Date(props.publishedData).toLocaleDateString("en-US" , {
        year:"numeric",
        month:"long",
        day:"numeric"
    })


    return <div className="flex justify-center my-5">
        <div className="w-[90%] md:w-[70%] flex flex-col gap-5">
            <div className="font-extrabold text-3xl">
                <div className="">{props.title}</div>
                <span className="text-lg font-medium text-gray-500">{`Posted on ${formattedData}`}</span>
            </div>

            <div className={`${props.imgUrl ? `flex flex-col gap-5` : ``}`}>
                
                {props.imgUrl && <div className="flex justify-center ">
                    <img className="object-cover object-center   w-full h-[500px]" src={props.imgUrl} />
                </div>}

                <div className="text-lg md:text-xl text-gray-700 leading-tight md:leading-[35px] text-justify">
                    {props.content}
                </div>
            </div>

            <div className="bg-slate-200 p-3  rounded-lg">
                <div className=" font-semibold">Author</div>
                <div className="flex items-center gap-3 ">
                    <div className="relative inline-flex items-center justify-center md:w-10 md:h-10 md:text-xl w-8 h-8 overflow-hidden bg-gray-300 rounded-full ">
                    <span className="font-medium text-gray-600 ">{props.author.username[0]}</span>
                    
                    </div>

                    <div className="flex flex-col">
                        <div className="text-lg font-semibold">{props.author.username}</div> 
                        <div>{props.author.email}</div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
}