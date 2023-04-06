import UserModel from "./../Models/userModel.js";
import  jwt  from "jsonwebtoken";
import { expressjwt} from "express-jwt"

const signin = async (req, res) => {
    try{
        let user = await UserModel.findOne({"email": req.body.email});
        if(!user){
            return res.status(401).json({
                error: "Utilisateur inconnu"
            });
        }

        if(!user.authenticate(req.body.password)){
            return res.status(401).send({ error: "L'email ou le mot de passe ne correspond pas"})
        }

        const token = jwt.sign({ _id: user._id, status: user.status, name: user.name}, "topSecret");
        

        res.cookie("t", token, {expire: new Date() + 9999 });

        return res.json({
            message: `Welcome ${user.name}`,
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    }catch(err){
        return res.status(401).json({error: "Could not sign in"});
    }
}

const signout = (req, res) => {
    res.clearCookie("t")
        return res.status(200).json({
            message: "signed out"
        })
}

const requireSignin = expressjwt({
    secret: "topSecret",
    algorithms: ['HS256']
})

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!(authorized)){
        return res.status(403).json({
            error: "User is not authorized"
        })
    }
    next();
}

const hasAuthorizationAsAdmin = async (req, res, next) => {
    const authorized = req.auth && req.auth.status == "Admin"
    if(!(authorized)){
        return res.status(403).json({
            error: "User is not authorized as Admin"
        })
    }
    next();
}

export default {signin, signout, requireSignin, hasAuthorization, hasAuthorizationAsAdmin}