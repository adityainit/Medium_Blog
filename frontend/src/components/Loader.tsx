import {  BarLoader, HashLoader } from "react-spinners";


export function Loader () {
    return <div className="flex justify-center h-screen">
        <div className="flex flex-col justify-center">
            <HashLoader size={80} color="#959595 "/>
        </div>
    </div>
}

export function Loader2() {
    return <div className="">

            <BarLoader width={500} height={2}  color="#959595 "/>

    </div>
}