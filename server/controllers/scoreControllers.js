import connection from "../database/index.js";


// @desc recupérer scores user
// @route GET /scores
// access Private
export const getScore = async (req, res) => {
    const idUser = req.idUser;

    // Comfirm data
    if (!idUser) {
        return res.status(400).json({ 
            error: "400 - Missing data",
            message: "Missing information" 
        });
    }
    // TODO : Verify data

    try {
        let sql = "SELECT score.game_id, score.score, score.date, game.name FROM score INNER JOIN game ON score.game_id = game.id WHERE score.utilisateur_id = ?";
        connection.query(sql,[idUser], async(err, result) => {
            if (err) throw err;

            return res.status(200).json({
                succes: "200",
                data: result,
                message: "Scores retrieved" 
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

// @desc Nouveau score
// @route POST /scores
// access Private
export const newScore = async (req, res) => {
    const { idGame, score } = req.body;
    const idUser = req.idUser;

    try {
        // Comfirm data
        if (!idUser || !idGame || !score) {
            return res.status(400).json({ 
                error: "400 - Missing data",
                message: "Missing data" 
            });
        }
        // TODO : Verify data

        // Check if score existe
        let sql = "SELECT id, utilisateur_id, game_id, score FROM score WHERE utilisateur_id = ? AND game_id = ?";
        connection.query(sql,[idUser, idGame], async (err, monScores) => {
            if (err) throw err;

            // New score
            if (!monScores.length) {
                sql = "INSERT INTO score (score, utilisateur_id, game_id) VALUES (?, ?, ?)";
                connection.query(sql, [score, idUser, idGame], async (err, result) => {
                    if (err) throw err;
                    return res.status(201).json({
                        succes: "201 - Data created",
                        message: "New Score"
                    });
                })
            }

            // Modify score
            if (monScores.length) {
                if (monScores[0].score >= score){
                    return res.status(200).json({
                        succes: "200 - Success",
                        message: "No action" 
                    });
                } else {
                    sql = "UPDATE score SET score = ?, date = ? WHERE id = ?";
                    let date = new Date();
                    date = date.toISOString().split('T')[0]+' '+date.toTimeString().split(' ')[0];
                    connection.query(sql,[score, date, monScores[0].id], async (err, result) => {
                        if (err) throw err;
                        return res.status(200).json({
                            succes: "200 - Success",
                            message: "Score modified"
                        });
                    })
                }
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "500 - Server error", 
            message: "An unexpected error occurred"
        })
    }
}

// @desc supprimer score
// @route DELETE /scores
// access Private
export const deleteScore = async (req,res) => {
    const { idGame } = req.body;
    const idUser = req.idUser;

    // Comfirm data
    if (!idUser || !idGame) {
        return res.status(400).json({ 
            error: "400 - Missing data",
            message: "Missing data" 
        });
    }
    // TODO : Verify data

    try {
        let sql = "DELETE FROM score WHERE utilisateur_id = ? AND game_id = ?";
        connection.query(sql, [idUser, idGame], async (err, result) => {
            if (err) throw err;

            return res.status(400).json({ 
                succes: "200 - Succes",
                message: "Score delete" 
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

// @desc recupérer scores jeu
// @route GET /scores/game
// access Public
export const getScoreGame = async (req,res) => {
    const id = req.params.id;

    // Comfirm data
    if (!id) {
        return res.status(400).json({ 
            error: "400 - Missing data",
            message: "Missing information" 
        });
    }
    // TODO : Verify data

    try {
        let sql = "SELECT score.utilisateur_id, score.score, score.date, utilisateur.name as utilisateurName FROM score INNER JOIN utilisateur ON score.utilisateur_id = utilisateur.id WHERE game_id = ? ORDER BY score.score DESC";
        connection.query(sql,[id], async(err, result) => {
            if (err) throw err;

            return res.status(200).json({
                succes: "200",
                data: result,
                message: "Scores retrieved" 
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

// @desc get all scores
// @route GET /scores/admin
// access Private
export const getScoreAdmin = async (req,res) => {
    try {
        let sql = "SELECT * FROM score";
        connection.query(sql, async(err, result) => {
            if (err) throw err;

            return res.status(200).json({
                succes: "200",
                data: result,
                message: "Scores retrieved" 
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

// @desc supprimer score (admin access)
// @route DELETE /scores
// access Private
export const deleteScoreAdmin = async (req,res) => {
    const { idGame, idUser } = req.body;

    try {
        // Comfirm data
        if (!idUser || !idGame) {
            return res.status(400).json({ 
                error: "400 - Missing data",
                message: "Missing data" 
            });
        }
        // TODO : Verify data

        let sql = "DELETE FROM score WHERE utilisateur_id = ? AND game_id = ?";
        connection.query(sql, [idUser, idGame], async (err, result) => {
            if (err) throw err;

            return res.status(400).json({ 
                succes: "200 - Succes",
                message: "Score delete" 
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
