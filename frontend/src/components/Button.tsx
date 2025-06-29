 

interface buttonProps {
    label:string,
    onClick?:any
}

export function Button(props : buttonProps) {
    return <div>
        <button onClick={props.onClick} className="bg-black text-white w-full text-sm py-2 rounded-md cursor-pointer hover:bg-gray-700" >{props.label}</button>
    </div>
}