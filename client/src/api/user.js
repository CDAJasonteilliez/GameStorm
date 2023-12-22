import axios from "axios";

export const inscription = async (values) => {
    try {
      const response = await axios.post("http://localhost:3000/users", values);
      if (response.status === 201) {
        return {succes: "Inscription réussite"}
      }
      throw new Error("Erreur inscription");
    } catch (err) {
        if (err.response?.status === 400) {
            return {error: ["Tous les champs sont requit."]}
        }
        if (err.response?.status === 409) {
            let res = []
            if (err.response.data.name) {
                res.push("Le nom d'utilisateur est déjà utilisé.")
            }
            if (err.response.data.email) {
                res.push("L'adresse email est déjà utilisé.")
            }
            return {error: res}
        }
        return {error: ["Une erreur est survenue, veuillez réessayer ulterieurement."]}
    }
  };