import { useContext, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthContext";

import styles from "./Leaderboard.module.scss"

const Leaderboard = () => {
  const [gameData, setGameData, scoreData, setscoreData] = useOutletContext();
  const { userData, setUserData } = useContext(AuthContext);
  const [userScoreData, setUserScoreData] = useState(null);

  useEffect(()=> {
    
    if (userData) {
      if (scoreData) {
        let index = scoreData.findIndex((el) => el.utilisateur_id === userData.id)
        if (index >=0) {
          let temp = scoreData[index];
          let date = new Date(temp.date)
          let data = {
            name: temp.utilisateurName,
            score: temp.score,
            rang: index+1,
            date: date.toLocaleDateString('fr-FR')
          }
          setUserScoreData(data)
        }
      }
    }
  }, [scoreData]);

  return (
    <div  className={`${styles.leaderboard}`}>
    <h2>Votre score</h2>
    {!userData && <p>Vous devez vous connecté pour accéder à vos scores.</p>}
    {userData && 
    (
      <>
      {!userScoreData && <p>Vous n'avez aucun score pour ce jeu.</p>}
      {userScoreData && (
        <table className={`${styles.table}`}>
          <thead>
            <tr>
              <th className={`${styles.tableName}`}>Username</th>
              <th className={`${styles.tableScore}`}>Score</th>
              <th className={`${styles.tableRang}`}>Rang</th>
              <th className={`${styles.tableDate}`}>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={`${styles.tableName}`}>{userScoreData.name}</td>
              <td className={`${styles.tableScore}`}>{userScoreData.score}</td>
              <td className={`${styles.tableRang}`}>{userScoreData.rang}</td>
              <td className={`${styles.tableDate}`}>{userScoreData.date}</td>
            </tr>
          </tbody>
        </table>
      )}
      </>
    )}

    <h2>Leaderboard</h2>
      { (!scoreData || scoreData.length === 0) && <p>Aucun score pour ce jeu.</p>}
      {scoreData.length>0 && (
        <table className={`${styles.table}`}>
          <thead>
            <tr>
              <th className={`${styles.tableName}`}>Username</th>
              <th className={`${styles.tableScore}`}>Score</th>
              <th className={`${styles.tableRang}`}>Rang</th>
              <th className={`${styles.tableDate}`}>Date</th>
            </tr>
          </thead>
          <tbody>
            {scoreData.map((el, index)=> {
              let date = new Date(el.date)

              return (
                <tr key={index}>
                  <td className={`${styles.tableName}`}>{el.utilisateurName}</td>
                  <td className={`${styles.tableScore}`}>{el.score}</td>
                  <td className={`${styles.tableRang}`}>{index+1}</td>
                  <td className={`${styles.tableDate}`}>{date.toLocaleDateString('fr-FR')}</td>
                </tr>
              )
            })}
          </tbody>
    </table>
      )}
    </div>
  )
}

export default Leaderboard