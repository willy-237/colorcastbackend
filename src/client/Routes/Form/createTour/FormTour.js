import React, { useEffect, useState } from "react";
import  TextField  from "@mui/material/TextField/TextField.js";
import  Typography  from "@mui/material/Typography/Typography.js";
import Button from "@mui/material/Button/Button.js";
import { Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions } from "@mui/material"
import { Link, useNavigate } from "react-router-dom";
import { createTour } from "../../../Api/Tours/api-tours.js";
import "./FormTour.css";
import auth from "../../../Api/Auth/auth-helper.js";
import {Card} from 'primereact/card/card.esm.js'



function FormTour(){
    const [tour, setTour] = useState({
       city: "",
       concertHall: "",
       country: "",
       date: "",
       time:"",
       error: "",
       open : false,
       redirectToLogin: false,
   })
   const navigate = useNavigate();

   useEffect(()=>{
    if(tour.redirectToLogin){
        navigate("/")
    }
   }, [tour.redirectToLogin])

   const handleChange = name => event =>{
       setTour({
           ...tour,
           [name]: event.target.value
       })
   }

   const handleSubmit = (e) => {
       e.preventDefault();

       const value = {
           city: tour.city || "",
           concertHall: tour.concertHall || "",
           country: tour.country || "",
           date: tour.date || "",
           time: tour.time || "",
       }

       const jwt = auth.isAuthenticated()
       

       createTour(value, {t: jwt.token}).then((data) => {
           if(data && data.error){
            if(!jwt){
                setTour({
                    ...tour,
                    error: data.error,
                })
                setTimeout(()=>{
                    setTour({
                        ...tour,
                        redirectToLogin: true
                    });
                }, 1600)
            }else{
                setTour({
                    ...tour,
                    error: data.error
                });
                setTimeout(()=>{
                 setTour({
                     ...tour,
                     error: ""
                 });
             }, 1600)
            }
               
           }else{
            setTour({
                ...tour,
                open: true
            })
           }
       })
   }

   return(
       <Card>
            <form className="login" onSubmit={handleSubmit} method="POST"> 
                <div className="city">
                    <TextField label="Ville"  id="city" name="city" type="text" value={tour.city} onChange={handleChange("city")}/>
                </div>

                <div className="concertHall">
                    <TextField label="Salle de concert" id="concertHall" name="concertHall" type="text" value={tour.concertHall} onChange={handleChange("concertHall")}/>
                </div>

                <div className="country">
                    <TextField label="Pays"  id="country" name="country" type="text" value={tour.country} onChange={handleChange("country")}/>
                </div>

                <div className="date">
                    <TextField label="Date"  id="date" name="date" type="text" value={tour.date} onChange={handleChange("date")}/>
                </div>

                <div className="time">
                    <TextField label="Heure"  id="time" name="time" type="text" value={tour.time} onChange={handleChange("time")}/>
                </div>

                {tour.error && (<div><Typography color="error">{tour.error}</Typography></div>)}

                <div className="button">
                    <Button variant="contained" type="submit">Soumettre</Button>
                </div>

                <Dialog open={tour.open}>
                        <DialogTitle>Nouvelle Tournée</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Nouvelle Tournée ajoutée
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

export default FormTour