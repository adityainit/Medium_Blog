import { useState } from "react"

interface inputBoxProps {
    label:string,
    placeholder: string,
    endIcon?:any
    endIcon2?:any
    onChange?:(e: any) => void;

    //ChangeEvent<HTMLInputElement>
}

export function PasswordInputBox(props : inputBoxProps) {

    const [show,setShow] = useState(false)

    return <div className="flex flex-col gap-1">
        <p className="font-semibold">{props.label}</p>
        <div className="relative itmes-center">
            <input onChange={props.onChange} type={show ? "text" : "password"} className="focus:outline-none border border-gray-400 rounded-md px-2 py-1 text-sm w-2xs" placeholder={props.placeholder} />

            {show ? 
                <div onClick={()=>{setShow(prev => !prev)}} className="absolute right-1 bottom-[5px] cursor-pointer "> 
                    {props.endIcon}
                </div> : 
                
                <div onClick={()=>{setShow(prev => !prev)}} className="absolute right-1 bottom-[5px] cursor-pointer">
                    {props.endIcon2}
                </div>
            }

        </div>
        
    </div>
} 

export function InputBox(props : inputBoxProps) {


    return <div className="flex flex-col gap-1">
        <p className="font-semibold">{props.label}</p>
        <div className="relative itmes-center">
            <input onChange={props.onChange} type="text"  className="focus:outline-none border border-gray-400 rounded-md px-2 py-1 text-sm w-2xs" placeholder={props.placeholder} />
        </div>
        
    </div>
} 