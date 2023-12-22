import axios from "axios";

export const connexion = async (values) => {
    try {
        const response = await axios.post("http://localhost:3000/auth", values);
        if (response.status === 200) {
            return {succes: "Connexion réussite"}
          }
          throw new Error("Erreur connexion");
    } catch (err) {
        if (err.response?.status === 400) {
            return {error: ["Tous les champs sont requit."]}
        }
        if (err.response?.status === 401) {
            return { error: ["Adresse mail ou mot de passe incorrecte."]};
        }
        if (err.response?.status === 429) {
            return {
              error:
                ["Trop de tentatives de connexion, veuillez réessayer après 60 secondes."],
            };
        }
        return {error: ["Une erreur est survenue, veuillez réessayer ulterieurement."]}
    }
}
