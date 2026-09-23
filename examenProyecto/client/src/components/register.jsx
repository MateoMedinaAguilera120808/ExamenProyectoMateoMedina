import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';


function Register(){

    const [firstName, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    

    const fetchRegister = async() =>{
        try{
        const response = await axios.post('http://localhost:3000/users/',{
            firstName,
            lastName,
            password,
            email
        })

        console.log(response.data)

        }catch (error) {
        console.error("Error al registrarse:",  error.message);
    }
    };

    return(<>
    <h2>Register</h2>
     <input type="text" placeholder= "nombre" onChange={(event)=> setName(event.target.value)} />
     <input type="text" placeholder= "apellido" onChange={(event)=> setLastName(event.target.value)} />
    <input type="text" placeholder= "email" onChange={(event)=> setEmail(event.target.value)} />
    <input type="text" placeholder= "contraseña" onChange={(event)=> setPassword(event.target.value)} />
    <Button variant= 'contained' onClick={fetchRegister}>Register</Button>
    </>
    )
}
export default Register 