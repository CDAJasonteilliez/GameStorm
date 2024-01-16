import connection from "../database/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// @desc Login
// @route POST /auth
// access Public
export const login = async (req, res) => {
    const { email, password } = req.body;

    // Confirm data
    if (!email || !password) {
        return res.status(400).json({ 
            error: "400 - Missing data",
            message: "All fields are require"  
        });
    }
    try {
        const lowerCaseEmail = email.toLowerCase();

        // Check for user
        let sql = "SELECT * FROM utilisateur WHERE email = ?";
        connection.query(sql, [lowerCaseEmail], async (err, user) => {
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

            res.status(200).json({
                succes: "200 - Login",
                message: "Login successful",
                UserInfo: {
                    id: user[0].id,
                    name: user[0].name,
                    email: user[0].email,
                    role: user[0].role,
                    createdAt: user[0].createdAt 
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

// @desc Logout
// @route Post /auth/Logout
// access Public
export const logout = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies.jwt) {
        return res.status(204).json({
            succes: "204 - No content",
            message: "Logout successful",
        })
    }

    res.clearCookie("jwt", {
        httpOnly: true,
        secure: false,
        sameSite: "None",
 
    });
    
    res.status(200).json({
        succes: "200 - Logout",
        message: "Logout successful",
    });
}

// @desc Refresh
// @route Get /auth/refresh
// access Public
export const refresh = async (req, res) => {
    const cookies = req.cookies;

    try {
        if (!cookies?.jwt) {
            return res.status(401).json({
                error: "401 - Unauthorized",
                message: "No JWT" 
            })
        }

        const token = cookies.jwt;

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        error: "401 - Unauthorized",
                        message: "Fail decode JWT"
                    })
                }
                try {
                    if(decoded.exp - Date.now() / 1000 < 1728000) {
                        return res.status(401).json({
                            error: "401 - Unauthorized",
                            message: "JWT expired"
                        })
                    }

                    let sql = "SELECT id, name, email, role, createdAt FROM utilisateur WHERE id = ?";
                    connection.query(sql, [decoded.UserInfo.id], async (err, user) => {
                        if (err) throw err;

                        if(!user.length) {
                            return res.status(401).json({
                                error: "401 - Unauthorized",
                                message: "No user"
                            })
                        }

                        res.status(200).json({
                            succes: "200 - Refresh",
                            message: "Refresh successful",
                            UserInfo: {
                                id: user[0].id,
                                name: user[0].name,
                                email: user[0].email,
                                role: user[0].role,
                                createdAt: user[0].createdAt
                            }
                        })
                    })

                } catch(error) {
                    console.error(error);
                    res.status(500).json({
                        error: "500 - Server error", 
                        message: "An unexpected error occurred"
                    })
                } 
            }
        )
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "500 - Server error", 
            message: "An unexpected error occurred"
        })
    }
}