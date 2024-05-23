const initialGameBoard = [
    [null,null,null],
    [null,null,null],
    [null,null,null],
]

export default function GameBoard({onSelectSquare, turns}){
    // const [gameBoard,setGameBoard] = useState(initialGameBoard);
    
    // function handleSelectSquare(rowIndex,colIndex){
    //     setGameBoard((prevGameBoard) => {
    //         let updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     })
    //     onSelectSquare();
    // }
    let gameBoard = initialGameBoard;
    
    for(let turn of turns){
        const {square:{row,col} , player} = turn;
        gameBoard[row][col] = player;
    }

    return(
        <ol id="game-board">
            {gameBoard.map((row,rowIndex) => 
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol,colIndex) => (
                            <li key={colIndex}> <button onClick={()=> onSelectSquare(rowIndex,colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button> </li> 
                            )
                        )}
                    </ol>
                </li>
            )}
        </ol>
    )
}