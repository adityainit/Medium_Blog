


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"





export function Avatar(props:any) {

    const navigate = useNavigate()

    function logoutHandler() {
        localStorage.removeItem("token");
        navigate("/signin")
    }


    return <div className="relative inline-flex items-center justify-center md:w-10 md:h-10 md:text-xl w-8 h-8 overflow-hidden bg-gray-300 rounded-full ">
        <DropdownMenu>
        <DropdownMenuTrigger><span className="font-medium text-gray-600 ">{props.username[0]}</span></DropdownMenuTrigger>
        <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {navigate("/blogs")}}>Home</DropdownMenuItem>
        <DropdownMenuItem onClick={() => {navigate("/myblogs")}}>My Blogs</DropdownMenuItem>
        <DropdownMenuItem onClick={logoutHandler}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
                    
    </div>
}