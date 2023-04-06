import React, { useState, useEffect } from "react";
import  styled  from '@mui/material/styles/styled.js'
import TextField from "@mui/material/TextField/TextField.js";
import Button from "@mui/material/Button/Button.js"
import Avatar from "@mui/material/Avatar/Avatar.js"
import "./Login.css";
import auth from "../../Api/Auth/auth-helper.js"
import { signin } from "../../Api/Auth/api-auth.js";
import Typography from "@mui/material/Typography/Typography.js";
import { useNavigate } from "react-router-dom"
import {Card} from 'primereact/card/card.esm.js'


const css = {
    avatar: {
        width: "100px",
        height: "100px",
        backgroundColor: "#1976d2",
        color: "white"
    }
}

function Login(){
    const [login, setLogin] = useState({
        email: "",
        password: "",
        error: "",
        redirectToHome : false
    })
    const navigate = useNavigate()

    const handleChange = name => event => {
        
        setLogin({
            ...login,
            [name]: event.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const user = {
            email: login.email || undefined,
            password: login.password || undefined
        }

        signin(user).then((data) => {
            console.log(user)
            if(data.error){
                setLogin({
                    ...login,
                    error: data.error
                });
                setTimeout(()=>{
                    setLogin({
                        ...login,
                        email:"",
                        password: "",
                        error: ""
                    });
                }, 1600)
            }else{
                auth.authenticate(data, () =>{
                    setLogin({
                        ...login,
                        redirectToHome: true
                    })
                })
            }
        })
    }
    
    useEffect(() =>{
        if(login.redirectToHome){
            navigate("/tours")
        }
    }, [login.redirectToHome])
    
    
    return(
        <> 
         <Card>
            <form className="login" onSubmit={handleSubmit} method="POST"> 
                <div className="avatar">
                    <Avatar style={css.avatar}>Connexion</Avatar>
                </div>

                <div className="email">
                    <TextField label="adresse mail"  id="email" name="email" type="email" value={login.email} onChange={handleChange("email")}/>
                </div>

                <div className="password">
                    <TextField label="mot de passe" id="password" name="password" type="password" value={login.password} onChange={handleChange("password")}/>
                </div>

                {login.error && (<div><Typography color="error">{login.error}</Typography></div>)}

                <div className="button">
                    <Button variant="contained"  type="submit">Soumettre</Button>
                </div>
            </form>
         </Card>
        </>
    )
}

export default Login;