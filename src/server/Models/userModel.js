// Ici je definis le modèle de ceux qui vont gérer le site

import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Le nom de l'utilisateur est requis",
    },
    email: {
        type: String,
        trim: true,
        match: [/.+\@.+\..+/, "Une adresse mail est requise"],
        required: "Une adresse mail est requise"
    },
    created: {
        type: Date,
        default: Date.now
    },

    //On ne va pas stocker le mot de passe directement dans la base de données
    //On va plutot stocker le mot de passe encryptée

    hashed_password: {
        type: String,
        required: "Le mot de passe est requis"
    },
    salt: String,
    updated: Date,
    status: {
        type: String,
        default: "Collaborator"
    }
});


//propriété virtuelle pour le mot de passe 
userSchema.virtual("password").set(function(password){
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
}).get(function(){
    return this._password;
});


userSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password){
        if(!password) return '';
        
        try{
            return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
        }catch(err){
            return "";
        }
    },
    makeSalt: function(){
        return Math.round((new Date().valueOf() * Math.random())) + ""
    }
}

//fonction pour valider le mot de passe
userSchema.path("hashed_password").validate(function(v){
    if(this._password && this._password.length < 6){
        this.invalidate("password", "le mot doit avoir au moins 6 caractères")
    }
    if(this.isNew && !this._password){
        this.invalidate("password", "Le mot de passe est requis")
    }
});

//fonction pour verifier si il y a des champs dupliqués
userSchema.pre("save", async function(next){
    const name = await this.constructor.findOne({
        name: this.name,
    });
    const email = await this.constructor.findOne({
        email: this.email,
    });
    const name_email =  await this.constructor.findOne({
        name: this.name,
        email: this.email,
    });
    
    let message = "";
    
    if(name_email){
        message = 'Ce compte existe deja';
        return next(new Error(message));
    }else if(name){
        message = 'Ce nom est deja pris';
        return next(new Error(message));
    }else if(email){
        message = 'Cette adresse mail est deja prise'
        return next(new Error(message));
    }
    
    return next();
        
})

//fonction pour verifier qu'il reste au moins 1 admin avant de supprimer un compte admin
userSchema.pre("deleteOne", { document: true } ,async function(next){
    const users = await this.constructor.find({
        status: this.status
    })
    if(users[0].status === "Admin"){
        if(users.length === 1){
            return next(new Error("Il faut au moins 1 administrateur"))
        }
    }
    
    return next();
        
})



export default mongoose.model("User", userSchema)