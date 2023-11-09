import { useState } from "react"
import { Link } from "react-router-dom"
export default function RegisterPage(){
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    async function register(ev){
        ev.preventDefault();           

        const response=await fetch('http://localhost:4000/register',{
            method:'POST',
            body:JSON.stringify({username,password}),
            headers:{'Content-Type':'application/json'},

        })   ;
        if(response.status===200){
            alert('registration successfull');
        }
        else{
            alert('registration failed')
        }

    }
    return(
        <div>
            <form className="login" onSubmit={register}>
            <h1>Register</h1>
            <input type="text" 
                   placeholder="username"
                   value={username}
                   onChange={e=>setUsername(e.target.value)}/>
            <input type="password" 
                   placeholder="password"
                   value={password}
                   onChange={e=>setPassword(e.target.value)}/>
            <button>Register</button>
            </form>
            <p>Do Have an account? <Link className="custom-link"to={"/login"}>Login</Link></p>
        </div>        
        )
}