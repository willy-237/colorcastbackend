// Ici on va definir toutes les opérations qu'on peut effectuer sur les gérants du back office

import errorHandler from "./../ErrorHelpers/errorHelpers.js";
import UserModel from "./../Models/userModel.js"
import  extend  from "lodash/extend.js";
import userModel from "./../Models/userModel.js";

//fonction pour créer un utilisateur
const createUser = async (req, res) =>{
    const user = new UserModel(req.body)
    try{
        await user.save();
        user.hashed_password = undefined
        user.salt = undefined;
        return res.status(200).json({
            message: "Nouveau utilisateur ajouté",
            userCreated: user
        })
    }catch(err){
        return res.status(400).json({
            error:  errorHandler.getErrorMessage(err)
        })
    }
};

//fonction pour afficher toues les utilisateurs
const listUsers = async (req, res) => {
    try{
        let users = await UserModel.find().select("name email updated created");
        if(users.length === 0){
            return res.json({
                message: "Pas encore d'utilisateurs"
            })
        }
        return res.json(users)
    }catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
};

//fonction pour rechercher une tournée par id
const userByID = async (req, res, next, id) => {
    try {
        let user = await UserModel.findById(id)
        if(!user){
            return res.status(400).json({
                error: "Utilisateur inconnu"
            })
        }
        req.profile = user;
        next()
    }catch (err){
        return res.status(400).json({
            error: "Could not retrieve user"
        })
    }
};

//fonction pour afficher un utilisateur grâce à son id 
const readUser = (req, res) => {
    //On s'assure de ne pas envoyer le mot de passe encryptée
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

//fonction pour modifier un utilisateur
const updateUser = async (req, res) => {
    try{
        let user = req.profile;
        user.updated = Date.now();
        user = extend(user, req.body);
        await userModel.replaceOne({_id: user._id}, user)
        user.hashed_password = undefined
        user.salt = undefined;
        return res.json({
            message: "you have successfully updated the previous user",
            newUser: user
        })
    }catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
};

//fonction pour supprimer un utilisateur
const deleteUser = async (req, res) => {
    try{
        let deletedUser = req.profile;
        await deletedUser.deleteOne();
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;
        deleteUser.updated = undefined;
        res.json({
            message: "Vous avez supprimé un utilisateur",
            deletedUser
        })
    }catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
};



export default { createUser, userByID, readUser, updateUser, deleteUser, listUsers }