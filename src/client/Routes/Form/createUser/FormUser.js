import React, { useEffect, useState } from "react";
import  TextField  from "@mui/material/TextField/TextField.js";
import  Typography  from "@mui/material/Typography/Typography.js";
import Button from "@mui/material/Button/Button.js";
import { Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions } from "@mui/material"
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../../Api/Users/api-users.js"
import "./FormUser.css";
import auth from "../../../Api/Auth/auth-helper.js";
import {Card} from 'primereact/card/card.esm.js'



function FormUser(){
    const [user, setUser] = useState({
       name: "",
       email: "",
       password: "",
       error: "",
       open : false,
       redirectToLogin: false,
   })
   const navigate = useNavigate();

   useEffect(()=>{
    if(user.redirectToLogin){
        navigate("/")
    }
   }, [user.redirectToLogin])

   const handleChange = name => event =>{
       setUser({
           ...user,
           [name]: event.target.value
       })
   }

   const handleSubmit = (e) => {
       e.preventDefault();

       const value = {
           name: user.name|| "",
           email: user.email || "",
           password: user.password || "",
          
       }

       const jwt = auth.isAuthenticated()
       

       createUser(value, {t: jwt.token}).then((data) => {
           if(data && data.error){
            if(!jwt){
                setUser({
                    ...user,
                    error: data.error,
                })
                setTimeout(()=>{
                    setUser({
                        ...user,
                        redirectToLogin: true
                    });
                }, 1600)
            }else{
                setUser({
                    ...user,
                    error: data.error
                });
                setTimeout(()=>{
                 setUser({
                     ...user,
                     error: ""
                 });
             }, 1600)
            }
               
           }else{
            setUser({
                ...user,
                open: true
            })
           }
       })
   }

   return(
       <Card>
            <form className="login" onSubmit={handleSubmit} method="POST"> 
                <div className="name">
                    <TextField label="Nom"  id="name" name="name" type="text" value={user.name} onChange={handleChange("name")}/>
                </div>

                <div className="concertHall">
                    <TextField label="email" id="email" name="email" type="email" value={user.email} onChange={handleChange("email")}/>
                </div>

                <div className="mot-de-passe">
                    <TextField label="Mot de passe"  id="password" name="password" type="password" value={user.password} onChange={handleChange("password")}/>
                </div>

                {user.error && (<div><Typography color="error">{user.error}</Typography></div>)}

                <div className="button">
                    <Button variant="contained" type="submit">Soumettre</Button>
                </div>

                <Dialog open={user.open}>
                        <DialogTitle>Nouvel Administrateur</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Nouvel administrateur Ajouté
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Link to="/tours">
                                <Button  variant="contained">Retour à la Page d'acceuil</Button>
                            </Link>
                        </DialogActions>
                </Dialog>
            </form>
       </Card>
   )
}

export default FormUser