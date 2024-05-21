import { useState } from "react"

export default function Player({name,symbol,isActive}){
    const [playerName,setPlayerName] = useState(name)
    const [isEditing,setIsEditing] = useState(false);

    function handleButtonClick(){
        setIsEditing((editing) => !editing);
    };
    function handleInputChange(event){
        setPlayerName(event.target.value)
    }

    return(
        <li className={isActive? 'active' : undefined}>
            <span className="player">
              { isEditing ? <input type="text" value={playerName} onChange={handleInputChange} required></input> : <span className="player-name">{playerName}</span>}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleButtonClick}>{isEditing? 'Save' : 'Edit'}</button>
          </li>
    )
}