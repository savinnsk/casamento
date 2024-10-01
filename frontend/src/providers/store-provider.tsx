import { createContext , useState} from "react";

export const  StoreContext = createContext({});

export default function StoreProvider({
    children
} : {children : React.ReactNode}){

    const [user,setUser] = useState({})
    const [homePage,setHomePage] = useState(false)
    const [userPage,setUserPage] = useState(false)
    const [loginPage,setLoginPage] = useState()


    return <StoreContext.Provider value={{
        user,setUser,
        homePage,setHomePage,
        userPage,setUserPage,
        loginPage,setLoginPage}}>
        {children}
    </StoreContext.Provider>
}