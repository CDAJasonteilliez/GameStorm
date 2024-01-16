import connection from "../database/index.js";

//@desc get all active game
//@route GET /games
//access public
export const getActiveGames = async (req, res) => {
    try {
        let sql = "SELECT id, name, link, miniature, description, addedAt FROM game WHERE active = ?";
        connection.query(sql, [1], async (err, games) => {
            if (err) throw err;

            res.status(200).json({
                succes: "200",
                data: games
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

//@desc get game information from name
//@route Get /games/name/:link
//access public
export const getGameFromLink = async (req, res) => {
    const link = req.params.link;

    try {
        let sql = "SELECT id, name, link, miniature, description, addedAt FROM game WHERE active = ? AND link = ?";
        connection.query(sql, [1, link], async (err, game) => {
            if (err) throw err;

            if (!game.length) {
                return res.status(400).json({ 
                    error: "400 - Bad request",
                    message: "Bad request" 
                });
            }

            res.status(200).json({
                succes: "200",
                message: "Game Data retrieved",
                data: game
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

//@desc get all game (admin access)
//@route GET /games/admin
//access private
export const getGames = async (req,res) => {
    console.log("get games");
    return res.status(500).json({
        error: "500 - Server error", 
        message: "TODO : getGames"
    })
}

//@desc post game (admin access)
//@route POST /games/admin
//access private
export const addGame = async (req,res) => {
    console.log("addGame");
    return res.status(500).json({
        error: "500 - Server error", 
        message: "TODO : addGame"
    })
}

//@desc modify game (admin access)
//@route PUT /games/admin
//access private
export const modifyGame = async (req,res) => {
    console.log("modifyGame");
    return res.status(500).json({
        error: "500 - Server error", 
        message: "TODO : modifyGame"
    })
}

//@desc delete game (admin access)
//@route delete /games/admin
//access private
export const deleteGame = async (req,res) => {
    console.log("deleteGame");
    return res.status(500).json({
        error: "500 - Server error", 
        message: "TODO : deleteGame"
    })
}

