//je definis ici le modèle des tournées

import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
    city:{
        type: String,
        trim: true,
        required: "le Nom de la ville est requis"
    },
    concertHall: {
        type: String,
        trim: true,
        required: "le nom de la salle de concert est requise"
    },
    country:{
        type: String,
        trim: true,
        required: "le nom du pays est requis"
    },
    time:{
        type: String,
        match: [/^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/, "l'Heure est requise au format heure(s):minute(s)"],
        required: "l'Heure est requise"
    },
    date:{
        type: String,
        match: [/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, "La date est requise au format Jour/mois/année"],
        required: "La date est requise "
    }

})

tourSchema.pre("save", async function(next){
    const concert = await this.constructor.findOne({
        date: this.date,
        time: this.time,
        country: this.country,
        city: this.city,
        concertHall: this.concertHall
    });
    if (concert) {
        const err = new Error('Concert déjà prévu ce jour et à cette heure');
        return next(err);
    }
    next();
})

export default mongoose.model("Tour", tourSchema)