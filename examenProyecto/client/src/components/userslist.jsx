
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';


function UserList() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchUsers()
    }, [])

    const token = localStorage.getItem('token')

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users/', {
                headers: {
                    authorization: token
                }


            })

            setUsers(response.data)


        } catch (error) {
            console.status(404).json({ msj: 'Error al buscar los usuarios' });
        }
    };

    return  (
        <>
            <h2>usuarios</h2>
            {users && users.length !== 0 ? <ul>
                {
                users.map((user) => {
                    return (
                    <li>
                        {user.firstName} - {user.lastName}
                    </li>
                    )
                })
                
            }

            </ul>:<h2>Debes Estar Loggeado</h2>}

            

        </>
    )
}
        export default UserList