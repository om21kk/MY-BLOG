import { Link } from "react-router-dom" 
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function LoginPage(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);
    async function login(ev){
        ev.preventDefault();
        const response=await fetch('http://localhost:4000/login',{
            method:'POST',
            body:JSON.stringify({username,password}),
            headers:{'Content-type':'application/json'},
            credentials:"include",
        })
        if(response.ok)
        {
            setRedirect(true);
        }
    }
    if (redirect) {
        return <Navigate to={'/'} />
      }
    return(
    <div>   
        <form className="login" onSubmit={login}>
        <h1>Login</h1>
        <input type="text" 
               placeholder="username" 
               value={username} 
               onChange={ev=>setUsername(ev.target.value)}/>
        <input type="password" 
               placeholder="password"
               value={password} 
               onChange={ev=>setPassword(ev.target.value)}/>
        <button>Login</button>
        </form>
        <p>Don't Have an account? <Link className="custom-link" to={"/register"}>Register</Link></p>
    </div>
    
    )

}