import "./index.css"

import { useStore } from "../../hooks/store"
import "./index.css"

export function Header(){
    const {setUserPage,setHomePage, setCreateUserPage, setCreateGiftPage, setShowUserPage,user} = useStore()
    return <div className="header"> 
    <span onClick={()=> {setCreateUserPage(false),setCreateGiftPage(false),setUserPage(false) ,setHomePage(true),setShowUserPage(false)}}> Inicio </span> 

    {user.phone != "22998640068" &&  ( <span  onClick={()=> {setCreateGiftPage(false),setCreateUserPage(false),setUserPage(true) ,setHomePage(false),setShowUserPage(false)}}> Meus Presentes🎁 </span>) }
    
    {user.phone == "22998640068" && ( <span  onClick={()=> {setCreateGiftPage(false),setCreateUserPage(true),setUserPage(false) ,setHomePage(false),setShowUserPage(false)}}> + Usuario</span>) } 
    {user.phone == "22998640068" && ( <span  onClick={()=> {setCreateGiftPage(true), setCreateUserPage(false),setUserPage(false) ,setHomePage(false),setShowUserPage(false)}}> + Presente</span>) } 
    {user.phone == "22998640068" && ( <span  onClick={()=> {setShowUserPage(true) ,setCreateGiftPage(false), setCreateUserPage(false),setUserPage(false) ,setHomePage(false)}}> Ver Convidados</span>) } 

     </div>
 
}