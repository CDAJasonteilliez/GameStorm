import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext.jsx";
import usePersist from "../../hooks/usePersist.js";
import { Link } from "react-router-dom";
import { connexion } from "../../api/auth.js";
import { FlashContext } from "../../Context/FlashContext.jsx";

import styles from "./Connexion.module.scss"


const Connexion = () => {
    const [error, setError] = useState(null);
    const [persist, setPersist] = usePersist();
    const { userData, setUserData } = useContext(AuthContext);
    const { setFlashMessage, setTimer } = useContext(FlashContext);
    const navigate = useNavigate();

    const defaultValues = {
        email: "",
        password: "",
    };

    const yupSchema = yup.object({
        email: yup
            .string()
            .required("Ce champ est obligatoire"),
        password: yup
            .string()
            .required("Ce champ est obligatoire"),
    });

    const { register, handleSubmit, formState: {errors}} = useForm({
        defaultValues,
        resolver:yupResolver(yupSchema),
    });

    const submit = async (values) => {
        setError(null);
        try {
            const response = await connexion(values);
            if (response.succes) {
                setUserData(response.data)
                setFlashMessage({
                    message:"Connexion réussie !",
                    type: "succes"
                });
                setTimer(clearTimeout)
                setTimer(
                    setTimeout(() => {setFlashMessage(null);},5000)
                )
                navigate("/");
                return;
            }
            if (response.error) {
                setError(response.error);
                return;
            }
            throw new Error("Erreur inscription")
        } catch (error) {
            setError(["Une erreur est survenue, veuillez réessayer ulterieurement."]);
        }
    };

    const handleToggle = () => setPersist(prev => !prev);

    if (userData) {
        return (<Navigate to="/"/>);
    }

    return (
        <section className={`${styles.connexion}`}>
            <h1>CONNEXION</h1>
            {error && (
            <div className={`${styles.error}`}>
                {error.map((el, index) => {
                    return <p key={index}>{el}</p>
                })}
            </div>
            )}
            <form onSubmit={handleSubmit(submit)}>
                <div className={`${styles.input}`}>
                    <label htmlFor="email">Adresse mail :</label>
                    <input 
                        type="text" 
                        id="email"
                        {...register("email")}
                    />
                    {errors?.email && (
                        <p className={`${styles.errors}`} >{errors.email.message}</p>
                    )}
                </div>

                <div className={`${styles.input}`}>
                    <label htmlFor="password">Mot de passe :</label>
                    <input 
                        type="password" 
                        id="password"
                        {...register("password")}
                    />
                    {errors?.password && (
                        <p className={`${styles.errors}`}>{errors.password.message}</p>
                    )}
                </div>

                <div className={`${styles.checkbox}`}>
                    <input 
                        type="checkbox"
                        id="persist"
                        onChange={handleToggle}
                        checked={persist}
                    />
                    <label>Rester connecté</label>
                </div>

                <button className={`${styles.button}`}>CONNEXION</button>

            </form>
            <div className={`${styles.forgottenPassword}`}>
                <Link to='/mot-de-passe-oublie'>Mot de passe oublié ?</Link>
            </div>
            <div  className={`${styles.redirection}`}>
                <p>Vous n'avez pas de compte ?</p>
                <Link className={`${styles.button}`} to='/inscription'>INSCRIVEZ-VOUS</Link>
            </div>
        </section>

  )
}

export default Connexion