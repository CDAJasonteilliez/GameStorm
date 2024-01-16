import axios from "axios";

export const getGameScore = async (value) => {
    try {
        const response = await axios.get(`http://localhost:3000/scores/game/${value}`);
        if (response?.status === 200) {
            return {
                succes: "Score Récupéré",
                data: response.data.data
            }
        }
        throw new Error("Erreur récupération des scores");
    } catch (error) {
        if (err.response?.status === 400) {
            return {error: ["Nous ne trouvons pas le jeu."]}
        }
        return {error: ["Une erreur est survenue, veuillez réessayer ulterieurement."]}
    }
}

export const postNewScore = async (values) => {
    try {
        const response = await axios.post("http://localhost:3000/scores", values,{
            withCredentials: true,
        });
        if (response?.status === 200 || response?.status === 201 ) {
            return {succes: "Score enregistré"}
        }
        throw new Error("Erreur récupération des scores");
    } catch (error) {
        if (error.response?.status === 400) {
            return {error: ["Donnée manquante."]}
        }
        return {error: ["Une erreur est survenue, veuillez réessayer ulterieurement."]}
    }
}