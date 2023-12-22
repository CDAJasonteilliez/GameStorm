import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext.jsx";
import usePersist from "../../hooks/usePersist.js";
import { inscription } from "../../api/user.js";

import styles from "./Inscription.module.scss"
import { FlashContext } from "../../Context/FlashContext.jsx";

const Inscription = () => {
    const [error, setError] = useState(null);
    const { userData } = useContext(AuthContext);
    const { setFlashMessage, setTimer } = useContext(FlashContext);
    const navigate = useNavigate();

    const defaultValues = {
        name: "",
        email: "",
        password: "",
        confPassword: "",
        accept: false
    };

    const yupSchema = yup.object({
        name: yup
            .string()
            .required("Ce champ est obligatoire")
            .min(3, "3 charactères minimum")
            .max(12, "12 charactères maximum"),
        email: yup
            .string()
            .email("Email invalide !")
            .required("Ce champ est obligatoire")
            .matches(/^([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])$/, "Email invalide !"),
        password: yup
            .string()
            .required("Ce champ est obligatoire")
            .min(8, "8 charactères minimum")
            .max(20, "20 charactères maximum"),
        confPassword: yup
            .string()
            .required("Le champ est obligatoire")
            .oneOf(
                [yup.ref("password"), ""],
                "Mot de passe différent"
            ),
        accept: yup.boolean().oneOf([true], "Vous devez accepter")
    });

    const { register, handleSubmit, formState: {errors}} = useForm({
        defaultValues,
        resolver:yupResolver(yupSchema),
    });

    const submit = async (values) => {
        setError(null);
        try {
            const response = await inscription(values);
            if (response.succes) {
                setFlashMessage({
                    message:"Inscription réussie !",
                    type: "succes"
                });
                setTimer(clearTimeout)
                setTimer(
                    setTimeout(() => {setFlashMessage(null);},100000)
                )
                navigate("/connexion");
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

    if (userData) {
        return (<Navigate to="/"/>);
    }

    return (
        <section className={`${styles.inscription}`}>
            <h1>INSCRIPTION</h1>
            {error && (
            <div className={`${styles.error}`}>
                {error.map((el, index) => {
                    return <p key={index}>{el}</p>
                })}
            </div>
            )}
            <form onSubmit={handleSubmit(submit)}>

            <div className={`${styles.input}`}>
                    <label htmlFor="name">Nom d'utilisateur :</label>
                    <input 
                        type="text" 
                        id="name"
                        {...register("name")}
                    />
                    {errors?.name && (
                        <p className={`${styles.errors}`} >{errors.name.message}</p>
                    )}
                </div>                

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

                <div className={`${styles.input}`}>
                    <label htmlFor="confPassword">Confirmer mot de passe :</label>
                    <input 
                        type="password" 
                        id="confPassword"
                        {...register("confPassword")}
                    />
                    {errors?.confPassword && (
                        <p className={`${styles.errors}`}>{errors.confPassword.message}</p>
                    )}
                </div>

                <div className={`${styles.checkbox}`}>
                    <div>
                        <input 
                            type="checkbox" 
                            id="accept"
                            {...register("accept")}  
                        />
                        <label htmlFor="accept">Accepter les politique de confidentialité</label>
                    </div>
                    {errors?.accept && (
                        <p className={`${styles.errors}`}>{errors.accept.message}</p>
                    )}
                </div>

                <button className={`${styles.button}`}>INSCRIPTION</button>

            </form>
            <div  className={`${styles.redirection}`}>
                <p>Vous avez déjà un compte ?</p>
                <Link className={`${styles.button}`} to='/connexion'>CONNECTEZ-VOUS</Link>
            </div>
        </section>

  )
}

export default Inscription