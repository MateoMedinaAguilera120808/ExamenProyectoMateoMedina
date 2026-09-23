import './App.css'
import Button from '@mui/material/Button';
import Login from './components/login'
import Register from './components/register'
import UserList from './components/userslist'

function App() {
 
    const logout =  ()=>{
      localStorage.setItem('token','')
    }


  return (
    <>

    <Login/>


    <Register/>  

    <UserList/>

    <Button variant= 'contained' color='error' onClick={logout}>Loggout</Button>
    
    </>  
  )
}

export default App
