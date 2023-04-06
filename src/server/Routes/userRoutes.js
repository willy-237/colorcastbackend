import express from "express";
import userCtrl from "./../Controllers/userController.js"
import authCtrl from "./../Controllers/authController.js"

const router = express.Router();

//route pour créer un utilisateur et afficher la liste des utilisateurs. 
//Il faut etre connecter et authentifier en tant que Admin pour pouvoir creer un autre utilisateur
router.route("/api/users")
.post(authCtrl.requireSignin, authCtrl.hasAuthorizationAsAdmin, userCtrl.createUser)
.get(authCtrl.requireSignin, userCtrl.listUsers);


//route pour lire le profil , modifier et supprimer un utilisateur . Il faut avoir les autorisations pour la modification et la suppression
router.route("/api/users/:userId")
.get(authCtrl.requireSignin, userCtrl.readUser)
.put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.updateUser)
.delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.deleteUser);

//route que l'admin va utiliser
router.route("/api/users/admin/:userId")
.put(authCtrl.requireSignin, authCtrl.hasAuthorizationAsAdmin, userCtrl.updateUser)
.delete(authCtrl.requireSignin, authCtrl.hasAuthorizationAsAdmin, userCtrl.deleteUser);

router.param("userId", userCtrl.userByID)

export default router;
