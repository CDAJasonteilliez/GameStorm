import connection from "../database/index.js";
import bcrypt from "bcrypt";


// @desc get user info
// @route Get /users
// access Private
export const getInfoUser = async (req, res) => {
    const idUser = req.idUser;

    // Comfirm data
    if (!idUser) {
        return res.status(400).json({ 
            error: "400 - Missing data",
            message: "Missing data" 
        });
    }
    // TODO : Verify data

    try {
        // Check for user
        let sql = "SELECT id, name, email, avatar, role, createdAt FROM utilisateur WHERE id = ?";
        connection.query(sql, [idUser], async (err, user) => {
            if (err) throw err;

            // Check if user exist
            if (!user.length) {
                return res.status(400).json({ 
                    error: "400 - Bad request",
                    message: "Bad request" 
                });
            }
            
            return res.status(200).json({
                succes: "200",
                message: "Data retrieved",
                data: {
                    id: user[0].id,
                    name: user[0].name,
                    email: user[0].email,
                    avatar: user[0].avatar,
                    role: user[0].role,
                    createdAt: user[0].createdAt,
                }
            })
            
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "500 - Server error", 
            message: "An unexpected error occurred"
        })
    }
}

// @desc create new user
// @route POST /users
// access Public
export const createNewUser = async (req,res) => {
    const { name, email, password } = req.body;

    try {
        // Comfirm data
        if (!name || !email || !password) {
            return res.status(400).json({ 
                error: "400 - Missing data",
                message: "All fields are require" 
            });
        }

        const lowerCaseEmail = email.toLowerCase();

        // Check for duplicate
        let sql = "SELECT name, email FROM utilisateur WHERE name = ? OR email = ?";
        connection.query(sql, [name, lowerCaseEmail], async (err, duplicate) => {
            if (err) throw err;

            if (duplicate.length) {
                let response  = {
                    error: "409 - Duplicate data",
                    message: "Some data are duplicate"
                }
                duplicate.forEach ((element) => {
                    if (element.name === name) {
                        response.name = "name already existe"
                    }
                    if (element.email === lowerCaseEmail) {
                        response.email = "email already existe"
                    }
                });
                return res.status(409).json(response);
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create and store new user
            let sql = "INSERT INTO utilisateur (name, email, password) VALUES (?, ?, ?)";
            connection.query(sql, [name, lowerCaseEmail, hashedPassword], async (err, result) => {
                if (err) throw err;
                res.status(201).json({
                    succes: "201 - Data created",
                    message: `New user ${name} ${email} created` 
                });
            });
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "500 - Server error", 
            message: "An unexpected error occurred"
        })
    }
}

// @desc Modify user
// @route PUT /users
// access Private
export const modifyUser = async (req,res) => {
    const {name, email, avatar} = req.body;
    const id = req.idUser;

    // Comfirm data
    if (name === undefined || email === undefined || avatar === undefined) {
        return res.status(400).json({ 
            error: "400 - Missing data",
            message: "All fields are require" 
        });
    }
    // TODO : Verify data

    const lowerCaseEmail = email.toLowerCase();

    try {
        // Check for user
        let sql = "SELECT name, email, avatar FROM utilisateur WHERE id = ?";
        connection.query(sql, [id], async (err, user) => {
            if (err) throw err;

            // Check if user exist
            if (!user.length) {
                return res.status(400).json({ 
                    error: "400 - Bad request",
                    message: "Bad request" 
                });
            }

            let newName = user[0].name;
            let newEmail = user[0].email;
            let newAvatar = user[0].avatar;

            if (name != "") {
                newName = name;
            }
            if (lowerCaseEmail != "") {
                newEmail = lowerCaseEmail;
            }
            if (avatar != "") {
                newAvatar = avatar;
            }


            // check for duplicate
            sql = "SELECT name, email FROM utilisateur WHERE (name = ? OR email = ?) AND id != ?";
            connection.query(sql, [newName, newEmail, id], async (err, duplicate) => {
                if (err) throw err;

                if (duplicate.length) {
                    let response  = {
                        error: "409 - Duplicate data",
                        message: "Some data are duplicate"
                    }
                    duplicate.forEach ((element) => {
                        if (element.name === name) {
                            response.name = "name already existe"
                        }
                        if (element.email === lowerCaseEmail) {
                            response.email = "email already existe"
                        }
                    });
                    return res.status(409).json(response);
                }

                sql = "UPDATE utilisateur SET name = ?, email = ?, avatar = ? WHERE id = ?";
                connection.query(sql, [newName, newEmail, newAvatar, id], async (err, result) => {
                    if (err) throw err;
    
                    return res.status(200).json({
                        succes: "200 - Success",
                        message: "utilisateur modified",
                        data: {
                            name: newName,
                            email: newEmail,
                            avatar: newAvatar
                        }
                    });
                })
            });
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "500 - Server error", 
            message: "An unexpected error occurred"
        })
    }
}

// @desc Delete users
// @route Delete /users
// access Private
export const deleteUser = async (req,res) => {
    const idUser = req.idUser;
    const cookies = req.cookies;

    // Comfirm data
    if (!idUser) {
        return res.status(400).json({ 
            error: "400 - Missing data",
            message: "Missing data" 
        });
    }
    // TODO : Verify data

    try {
        let sql = "DELETE FROM utilisateur WHERE id = ?";
        connection.query(sql, [idUser], async (err, result) => {
            if (err) throw err;

            res.clearCookie("jwt", {
                httpOnly: true,
                secure: false,
                sameSite: "None",
            });

            return res.status(400).json({ 
                succes: "200 - Succes",
                message: "User deleted" 
            });
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "500 - Server error", 
            message: "An unexpected error occurred"
        })
    }
}

// @desc Modify password
// @route PUT /users/password
// access Private
export const modifyPasswordUser = async (req,res) => {
    const {password} = req.body;
    const id = req.idUser;

    // Comfirm data
    if (!idUser) {
        return res.status(400).json({ 
            error: "400 - Missing data",
            message: "Missing data" 
        });
    }
    // TODO : Verify data

    try {
        // Check for user
        let sql = "SELECT name, email, avatar FROM utilisateur WHERE id = ?";
        connection.query(sql, [id], async (err, user) => {
            if (err) throw err;

            // Check if user exist
            if (!user.length) {
                return res.status(400).json({ 
                    error: "400 - Bad request",
                    message: "Bad request" 
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            sql = "UPDATE utilisateur SET password = ? WHERE id = ?";
            connection.query(sql, [hashedPassword, id], async (err, result) => {
                if (err) throw err;

                return res.status(200).json({
                    succes: "200 - Success",
                    message: "Password modified",
 
                });
            })
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "500 - Server error", 
            message: "An unexpected error occurred"
        })  
    }
}

// @desc get all users (admin access)
// @route GET /users/admin
// access Private
export const getUsersAdmin = async (req,res) => {
    console.log("get all users");
    return res.status(500).json({
        error: "500 - Server error", 
        message: "TODO : getUsersAdmin"
    })
} 

// @desc modify user (admin access)
// @route Put /users/admin
// access Private
export const modifyUserAdmin = async (req,res) => {
    console.log("modify user admin");
    return res.status(500).json({
        error: "500 - Server error", 
        message: "TODO : modifyUserAdmin"
    })
}

// @desc delete user (admin access)
// @route delete /users/admin
// access Private
export const deleteUsersAdmin = async (req,res) => {
    console.log("delete user admin");
    return res.status(500).json({
        error: "500 - Server error", 
        message: "TODO : deleteUserAdmin"
    })
}
