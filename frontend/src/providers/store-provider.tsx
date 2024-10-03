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


    return <StoreContext.Provider value={{
        user,setUser,
        homePage,setHomePage,
        userPage,setUserPage,
        loginPage,setLoginPage,
        createUserPage,setCreateUserPage,
        createGiftPage,setCreateGiftPage,
        showUserPage,setShowUserPage
        }}>
        {children}
    </StoreContext.Provider>
}