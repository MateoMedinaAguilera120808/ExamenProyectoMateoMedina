import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';

function Likear() {
    const [idPosteo, setPosteo] = useState("")
    const postLike = async()=>{
        try{
        
            const token = localStorage.getItem('token');

            const response = await axios.post(`http://localhost:3000/users/posts/${idPosteo}/like`,{},
                {
                    headers:{
                        Authorization: token
                    }
                }
            );


        alert('El posteo ha sido likeado')

        }catch(error){
            console.log(error);
            
        console.error('error al likear el post')
        }
    }


     return(<>
    <h2>Likear Post</h2>
    <input type="text" placeholder= "id del post" onChange={(event)=> setPosteo(event.target.value)} />
    <Button variant= 'contained' onClick={postLike}>Likear</Button>
    </>
    )
} 
export default Likear 