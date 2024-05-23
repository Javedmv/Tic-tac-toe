import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winningCombination";
import GameOver from "./components/GameOver";

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
};

const INITIAL_GAME_BOARD = [
  [null,null,null],
  [null,null,null],
  [null,null,null],
];

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = "O";
  }
  return currentPlayer;
}

function derivedGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray])]
    
  for(let turn of gameTurns){
      const {square:{row,col} , player} = turn;
      gameBoard[row][col] = player;
  }
  return gameBoard;
}

function derivedWinner(gameBoard,players){
  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol]
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([])
  // const [hasWinner,setHasWinner] = useState(false);
  // const [activePlayer,setActivePlayer] = useState('X')

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = derivedGameBoard(gameTurns)
  
  const winner = derivedWinner(gameBoard,players);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handelSelectSquare(rowIndex,colIndex){
    // setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X' )
    setGameTurns((prevTurn) => {
      const currentPlayer = deriveActivePlayer(prevTurn);

      const updatedTurn = [{square:{row:rowIndex,col:colIndex},player:currentPlayer },...prevTurn];
      return updatedTurn;
    })
  }

  function handleRestart(){
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol,newName){
    setPlayers((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      }
    });
  }

  return (
    <main>
      <div id='game-container'>
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol='X' isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/>
          <Player name={PLAYERS.O} symbol='O' isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handelSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
