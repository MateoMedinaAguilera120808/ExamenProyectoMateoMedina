
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';


function Login(){

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const fetchLogin = async() =>{
        try{
        const response = await axios.post('http://localhost:3000/users/login',{
            passwordLogin: password ,
            emailLogin: email
        })

        alert('login Exitoso')
        localStorage.setItem('token',response.data.token)

         

        }catch (error) {
        alert('error al loggearse')
        console.error("Error al loguearse:", error.response?.data || error.message);
    }
    };

    return(<>
    <h2>LOGIN</h2>
    <input type="text" placeholder= "email" onChange={(event)=> setEmail(event.target.value)} />
    <input type="text" placeholder= "contraseña" onChange={(event)=> setPassword(event.target.value)} />
    <Button variant= 'contained' onClick={fetchLogin}>LOGIN</Button>
    </>
    )
}
export default Login 