import { createContext , useState} from "react";

export const  StoreContext = createContext({});

export default function StoreProvider({
    children
} : {children : React.ReactNode}){
    
    
  

    const [user,setUser] = useState({})
    const [homePage,setHomePage] = useState(true)
    const [userPage,setUserPage] = useState(false)
    const [createUserPage,setCreateUserPage] = useState()
    const [showUserPage,setShowUserPage] = useState()
    const [createGiftPage,setCreateGiftPage] = useState()
    const [loginPage,setLoginPage] = useState()
    const [users, setUsers] = useState<any[]>([]);
   
    return <StoreContext.Provider value={{
        user,setUser,
        homePage,setHomePage,
        userPage,setUserPage,
        loginPage,setLoginPage,
        createUserPage,setCreateUserPage,
        createGiftPage,setCreateGiftPage,
        showUserPage,setShowUserPage,
        users, setUsers
        }}>
        {children}
    </StoreContext.Provider>
}