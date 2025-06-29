
interface QuoteProps {
    quote:string,
    author:string,
    designation:string
}


export function Quote(props: QuoteProps) {
    return <div className="bg-slate-200  hidden md:block md:flex md:justify-center">
        <div className="md:flex md:flex-col md:gap-3 w-[70%] md:justify-center">
            <div className="font-bold text-2xl lg:text-3xl">
                "{props.quote}"
            </div>
            <div className="">
                <div className="text-md lg:text-xl font-semibold">
                {props.author}
                </div>
                <div className="text-sm text-gray-500 font-semibold">
                    {props.designation}
                </div>
            </div>
        </div>
    </div>
}

