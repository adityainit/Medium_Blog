interface textProps {
    text:string,
    link?:string,
    onClick?:any
}

export function Heading(props : textProps) {
    return <div className="text-center text-2xl font-bold">
        {props.text}
    </div>
}

export function BelowHeading(props : textProps) {
    return <div className="flex justify-center text-xs text-gray-500">
        {props.text}
        <a onClick={props.onClick} className="cursor-pointer underline">{props.link}</a>
    </div>
}