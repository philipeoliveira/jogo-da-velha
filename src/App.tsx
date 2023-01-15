import { useState, useEffect } from 'react';
import './App.css';

type Players = 'O' | 'X';

function App() {
   const [turn, setTurn] = useState<Players>('X');
   const [winner, setWinner] = useState<Players | null>(null);
   const [draw, setDraw] = useState<boolean | null>(null);
   const [choices, setChoices] = useState<{ [key: string]: Players }>({});

   const gameOver = !!winner || !!draw;

   const createCells = () => {
      return new Array(9).fill(true);
   };

   const play = (index: number) => {
      if (choices[index] || gameOver) {
         return;
      }

      setChoices((prev) => ({ ...prev, [index]: turn }));
      setTurn((prev) => (prev === 'O' ? 'X' : 'O'));
   };

   const getCellPlayer = (index: number) => {
      if (!choices[index]) {
         return;
      }

      return choices[index];
   };

   const getWinner = () => {
      const linesToWin = [
         [0, 1, 2],
         [3, 4, 5],
         [6, 7, 8],

         [0, 3, 6],
         [1, 4, 7],
         [2, 5, 8],

         [0, 4, 8],
         [2, 4, 6],
      ];

      for (const line of linesToWin) {
         const [a, b, c] = line;

         if (
            choices[a] &&
            choices[a] === choices[b] &&
            choices[a] === choices[c]
         ) {
            return choices[a];
         }
      }
   };

   const restartGame = () => {
      setTurn(choices[0] === 'O' ? 'X' : 'O');
      setChoices({});
      setWinner(null);
      setDraw(null);
   };

   useEffect(() => {
      const winner = getWinner();

      if (winner) {
         setWinner(winner);
      } else if (Object.keys(choices).length === 9) {
         setDraw(true);
      }
   }, [choices]);

   return (
      <div className='game-container'>
         {!gameOver && <p>É a vez do jogador {turn}</p>}
         {winner && <p>{winner} ganhou!</p>}
         {draw && <p>Empate</p>}
         <div className={`game-board${gameOver ? ' game-over' : ''}`}>
            {createCells().map((_, i) => (
               <div
                  className={`board-cell${
                     getCellPlayer(i) === undefined
                        ? ''
                        : ' player-' + getCellPlayer(i)
                  }`}
                  key={i}
                  onClick={() => play(i)}
               >
                  {choices[i]}
               </div>
            ))}
         </div>
         {gameOver && (
            <button className='restart-game' onClick={restartGame}>
               Reiniciar o jogo
            </button>
         )}
      </div>
   );
}

export default App;
