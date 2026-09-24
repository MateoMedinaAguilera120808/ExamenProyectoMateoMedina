import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';



function BorrarCuenta(){

const token = localStorage.getItem('token')


const fetchBorrar = async () => {
        try {

            if (!token) {
      alert('No se encontró un token válido. Por favor inicia sesión nuevamente.');
      return;
    }

            const response = await axios.post('http://localhost:3000/users/borrar',
                 {},{
                 headers: {
                    authorization: token
                }
                }
            )

            alert('El usuario fue borrado')
            localStorage.removeItem('token');
           
        } catch (error) {
            console.error({ msj: 'Error al querer borrar la cuenta' });
            
        }
    };


return(<>
    {token ? ( <ul>
    <Button variant= 'contained' onClick={fetchBorrar}>BORRAR CUENTA</Button>
    </ul>
    ):(<h2>Necesitas estar loggeado para poder borrar la cuenta</h2>)
    }
    </>
    )
}
export default BorrarCuenta 