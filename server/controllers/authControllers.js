import connection from "../database/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// @desc Login
// @route POST /auth
// access Public
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Confirm data
        if (!email || !password) {
            return res.status(400).json({ 
                error: "400 - Missing data",
                message: "All fields are require"  
            });
        }

        // Check for user
        let sql = "SELECT id, name, email, password, role, verify, active FROM utilisateur WHERE email = ?";
        connection.query(sql, [email], async (err, user) => {
            if (err) throw err;

            // Check email
            if (!user.length) {
                return res.status(401).json({ 
                    error: "401 - Unauthorized",
                    message: "Incorrect email or password" 
                });
            }

            // Check password
            const match = await bcrypt.compare(password, user[0].password);
            if (!match) {
                return res.status(401).json({ 
                    error: "401 - Unauthorized",
                    message: "Incorrect email or password" 
                });
            }

            // Check if mail verify
            if(!user[0].verify) {
                return res.status(401).json({ 
                    error: "401 - Unauthorized",
                    message: "Please validate your email" 
                });
            }

            // Check active
            if(!user[0].active) {
                return res.status(401).json({ 
                    error: "401 - Unauthorized",
                    message: "Your account has been blocked" 
                });
            }

            // Create token
            const accessToken = jwt.sign(
                {
                UserInfo: {
                        id: user[0].id,
                        role: user[0].role,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "32d" }
            );

            res.cookie("jwt", accessToken, {
                httpOnly: true,
                secure: false,
                sameSite: "None",
                maxAge: 32 * 24 * 60 * 60 * 1000,
            });

            res.json({
                succes: "200 - Login",
                message: "Login successful",
                UserInfo: {
                    id: user[0].id,
                    name: user[0].name,
                    email: user[0].email,
                    role: user[0].role,
                }
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