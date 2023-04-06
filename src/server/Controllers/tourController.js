// Ici on va définir toutes les opérations qu'on peut effectuer sur les tournées.

import TourModel from "../Models/tourModel.js";
import errorHandler from "./../ErrorHelpers/errorHelpers.js";
import extend from "lodash/extend.js";

//fonction pour créer une tournée
const createTour = async (req, res) =>{
    const tour = new TourModel(req.body)
    try{
        await tour.save();
        return res.status(200).json({
            message: "Nouvelle tournée ajoutée",
            tourCreated: tour
        })
    }catch(err){
        return res.status(400).json({
            error:  errorHandler.getErrorMessage(err)
        })
    }
};

//fonction pour lister toutes les tournées
const listTours = async (req, res) => {
    try{
        let tours = await TourModel.find().select("city concertHall country date time");
        if(tours.length === 0){
            return res.json({
                message: "Pas de tournée disponible pour le moment"
            })
        }
        return res.json(tours);
    }catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}


//fonction pour rechercher une tournée par id
const tourByID = async (req, res, next, id) =>{
    try {
        let tour = await TourModel.findById(id)
        if(!tour){
            return res.status(400).json({
                error: "Tournée pas trouvé"
            })
        }
        req.tour = tour;
        next()
    }catch (err){
        return res.status(400).json({
            error: "Impossible de trouver la tournée"
        })
    }
}

//fonction pour afficher une tournée
const readTour = (req, res) => {
    return res.json(req.tour)
}


//fonction pour modifier une tournée
const updateTour = async (req, res) => {
    try{
        let tour = req.tour;
        tour.updated = Date.now();
        tour = extend(tour, req.body);
        await TourModel.findOneAndUpdate(
            { _id: tour._id },
            { $set: req.body },
            { new: true, runValidators: true }
          )
        return res.json({
            message: "You have successfully updated a tour",
            newTourAdded: tour
        })
    }catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
};



//fonction pour supprimer une tournée
const deleteTour = async (req, res) => {
    try{
        let tour = req.tour;
        let deletedTour = await tour.deleteOne();
        return  res.json({
            message: "Vous venez de supprimer une tournée",
            deletedTour
        })
    }catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}



//fonction pour rechercher et lister les tournées par ville 
const listToursByCity = async (req, res) => {
    try {
        const city = req.params.city
        const cityRegex = new RegExp(city, "i")
        let tours = await TourModel.find({city: cityRegex});
        if(tours.length === 0){
            return res.status(200).json({
                message: `Pas de tournée prévue à ${city}`
            })
        }
        return res.json(tours)
    }catch (err){
        return res.status(400).json({
            error: "Could not retrieve Tours"
        })
    }
}



export default { createTour, tourByID, updateTour, deleteTour, listTours, listToursByCity, readTour }