import { useState } from 'react';
import './App.css'
import { Login } from './components/login/Login'
import { useStore } from './hooks/store'
import  StoreProvider  from './providers/store-provider'
import {ConfirmUserPresence } from './service/user-provider';
import { GiftList } from './components/lista-presentes/ListaPresentes';
import { Header } from './components/header/header';
import { UserGift } from './components/user-gifts/user-gifts';

import { CreateUser } from './components/create-user/create-user';
import { CreateGift } from './components/create-gift/create-gift';
import { UserList } from './components/show-users/show-users';

function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}

function MainContent() {
  const { user ,setUser,homePage,userPage ,createUserPage , createGiftPage, showUserPage} = useStore();

  const [errors, setErrors] = useState('');
  
  const handleSubmit = async (e : any) => {
    e.preventDefault();
    try {
   
        const result = await ConfirmUserPresence({phone : user.phone})

        setUser(result.user)
        setErrors('');
    } catch (err : any) {
        setErrors(err.errors[0]); 
    }
};


  return (
    <>
  
      { (!user.name ) && (
        <>
          <h1>
            Convite Para Culto de Comemoração ao Casamento <br />
          </h1>
          <Login />
        </>
      )} 

      { user.name && <Header/>} 
       { (user.name && homePage) && (<>
        <h2 className='presentation'>Olá {user.name}! sua presença
          {user.isConfirmed ? 
             <span> está <span 
             onClick={handleSubmit}
             className='confirm-button'
              style={{
              background:"#152707" ,
              padding : "5px"  ,
              display : "block" , marginTop:"10px" ,color :"white"}}>Confirmada 
              <p className='texto-pequeno'>clique aqui para confirmar ou não</p></span> 
           </span> 
          : 
         <span 
          onClick={handleSubmit}
          className='confirm-button'
          style={{
          background:"#a9676d" ,  
          padding : "5px" , borderRadius : "10px" , 
          display : "block" , marginTop:"10px"}}>Não Está Confirmada 
           <p className='texto-pequeno'>clique aqui para confirmar ou não</p>
         </span>  }
         </h2>

         <GiftList/>
         </>
      )}

      {  (userPage && !homePage)&& ( <UserGift/> ) }

      {  createUserPage && ( <CreateUser/> ) }
      {  createGiftPage && ( <CreateGift/> ) }
      {  showUserPage && ( <UserList/> ) }
    </>
  );
}

export default App
