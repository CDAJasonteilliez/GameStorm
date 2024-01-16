import jwt from "jsonwebtoken"

const verifyJWT = (req, res, next) => {
    const cookies = req.cookies;

    if (!cookies.jwt) {
        return res.status(401).json({
            error: "401 - Unauthorized",
            message: "Login",
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
            req.idUser = decoded.UserInfo.id;
            next();
        }
    )
}


export default verifyJWT;