import express from "express";
import {
    createNewUser, 
    deleteUser, 
    deleteUsersAdmin, 
    getInfoUser, 
    getUsersAdmin, 
    modifyPasswordUser, 
    modifyUser, 
    modifyUserAdmin,
} from "../../controllers/userControllers.js";
import verifyJWT from "../../middleware/verifyJWT.js";
import verifyAmin from "../../middleware/verifyAdmin.js";

const router = express.Router();

router.route('/')
    .get(verifyJWT, getInfoUser)
    .post(createNewUser)
    .put(verifyJWT, modifyUser)
    .delete(verifyJWT, deleteUser);

router.route('/password')
    .put(verifyJWT,modifyPasswordUser);

router.route('/user')
    .get(verifyJWT, verifyAmin, getUsersAdmin)
    .put(verifyJWT, verifyAmin, modifyUserAdmin)
    .delete(verifyJWT, verifyAmin, deleteUsersAdmin);

export default router;