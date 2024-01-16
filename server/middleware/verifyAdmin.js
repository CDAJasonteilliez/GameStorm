import connection from "../database/index.js";

const verifyAmin = (req, res, next) => {
    const id = req.idUser;

    try {
        let sql = "SELECT role FROM utilisateur WHERE id=?";
        connection.query(sql, [id], async (err, user) => {
            if (err) throw err;

            if (!user.length) {
                return res.status(401).json({ 
                    error: "401 - Unauthorized",
                    message: "Unauthorized" 
                });
            }

            if (user[0].role !== "administrateur") {
                return res.status(401).json({ 
                    error: "403 - Forbidden",
                    message: "Forbidden" 
                });
            }
            next();
        })
    } catch(error) {
        console.error(error);
        res.status(500).json({
            error: "500 - Server error", 
            message: "An unexpected error occurred"
        })
    }
}


export default verifyAmin;