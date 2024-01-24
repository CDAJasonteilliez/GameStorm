import express from "express";
import {
    createNewUser, 
    deleteUser, 
    deleteUsersAdmin, 
    getInfoUser, 
    getUsersAdmin, 
    modifyPasswordUser, 
    modifyUser, 
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

router.route('/admin')
    .get(verifyJWT, verifyAmin, getUsersAdmin)
    .delete(verifyJWT, verifyAmin, deleteUsersAdmin);

export default router;