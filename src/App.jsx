import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"

function App() {
  const [activePlayer,setActivePlayer] = useState('X');

  function handelSelectSquare(){
    setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X' )
  }

  return (
    <main>
      <div id='game-container'>
        <ol id="players" className="highlight-player">
          <Player name='player1' symbol='X' isActive={activePlayer === 'X'}/>
          <Player name='player2' symbol='O' isActive={activePlayer === 'O'}/>
        </ol>
        <GameBoard onSelectSquare={handelSelectSquare} activePlayerSymbol={activePlayer}/>
      </div>
    </main>
  )
}

export default App
