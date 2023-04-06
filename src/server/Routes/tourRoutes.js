import express from "express";
import tourCtrl from "./../Controllers/tourController.js";
import authCtrl from "./../Controllers/authController.js"

const router = express.Router();

//route pour creer une tournée et afficher la liste des tournées . La connexion est nécéssaire pour pouvoir créer une tournée
router.route("/api/tours")
.post(authCtrl.requireSignin, tourCtrl.createTour)
.get(tourCtrl.listTours);


//route pour afficher les tournées par ville
router.route("/api/tours/city/:city")
.get(tourCtrl.listToursByCity);


//route pour afficher une tournée par id, la modifier ou la supprimer . Il faut se connecter pour modifier et supprimer les tournées
router.route("/api/tours/:tourId")
.get(tourCtrl.readTour)
.put(authCtrl.requireSignin, tourCtrl.updateTour)
.delete(authCtrl.requireSignin, tourCtrl.deleteTour);




router.param("tourId", tourCtrl.tourByID);




export default router;