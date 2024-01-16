import axios from "axios";

export const getActivesGames = async () => {
    try {
        const response = await axios.get("http://localhost:3000/games");
        if (response?.status === 200) {

            return {
                succes: "Jeux récupéré",
                data: response.data.data
            }
          }
          throw new Error("Erreur connexion");
    } catch (error) {
        return {error: ["Une erreur est survenue, veuillez réessayer ulterieurement."]}
    }
}