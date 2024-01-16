import fs from 'fs';
import { useEffect, useState } from 'react';


const ListeJeux = () => {
    const [listeGameFolder, setListeGameFolder] = useState(null);

    useEffect(() => {
        let files = fs.readdirSync('../../../../../Game/GameList');
        setListeGameFolder(files)
    },[])

  return (
    <div>
        ListeJeux
        {listeGameFolder && console.log(listeGameFolder)}
    </div>
  )
}

export default ListeJeux