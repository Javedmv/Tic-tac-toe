import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winningCombination";

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([])
  // const [activePlayer,setActivePlayer] = useState('X')

  const activePlayer = deriveActivePlayer(gameTurns)

  function handelSelectSquare(rowIndex,colIndex){
    // setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X' )
    setGameTurns((prevTurn) => {
      const currentPlayer = deriveActivePlayer(prevTurn);

      const updatedTurn = [{square:{row:rowIndex,col:colIndex},player:currentPlayer },...prevTurn];
      return updatedTurn;
    })
  }

  return (
    <main>
      <div id='game-container'>
        <ol id="players" className="highlight-player">
          <Player name='player1' symbol='X' isActive={activePlayer === 'X'}/>
          <Player name='player2' symbol='O' isActive={activePlayer === 'O'}/>
        </ol>
        <GameBoard onSelectSquare={handelSelectSquare} turns={gameTurns}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
