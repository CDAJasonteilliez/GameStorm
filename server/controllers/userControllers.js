import connection from "../database/index.js";
import bcrypt from "bcrypt";

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

        // Check for duplicate
        let sql = "SELECT name, email FROM utilisateur WHERE name = ? OR email = ?";
        connection.query(sql, [name, email], async (err, duplicate) => {
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
                    if (element.email === email) {
                        response.email = "email already existe"
                    }
                });
                return res.status(409).json(response);
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create and store new user
            let sql = "INSERT INTO utilisateur (name, email, password) VALUES (?, ?, ?)";
            connection.query(sql, [name, email, hashedPassword], async (err, result) => {
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