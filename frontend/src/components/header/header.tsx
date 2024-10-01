import "./index.css"

import { useStore } from "../../hooks/store"
import "./index.css"

export function Header(){
    const {user,setUserPage,setHomePage} = useStore()
    return <div className="header"> 
    <span onClick={()=> {setUserPage(false) ,setHomePage(true)}}> Inicio </span> 
    <span  onClick={()=> {setUserPage(true) ,setHomePage(false)}}> Meus Presentes🎁 </span> </div>
}