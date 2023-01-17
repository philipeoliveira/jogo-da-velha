import { useState, useEffect } from 'react';
import { ArrowSquareOut, ArrowCounterClockwise } from 'phosphor-react';
import Logo from './assets/logo-jogo-da-velha.png';
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
         <header>
            <img src={Logo} className='game-logo' alt='Logo Jogo da Velha' />
         </header>
         <main className='flex-col-center'>
            {!gameOver && (
               <h1 className='flex-row-center'>
                  É a vez do{' '}
                  <span
                     className={`flex-col-center player-turn${
                        turn === 'O' ? ' player-O' : ' player-X'
                     }`}
                  >
                     {turn}
                  </span>
               </h1>
            )}
            {winner && (
               <p className='game-result flex-row-center'>
                  {' '}
                  <span
                     className={`flex-col-center player-turn${
                        winner === 'O' ? ' player-O' : ' player-X'
                     }`}
                  >
                     {winner}
                  </span>{' '}
                  ganhou!
               </p>
            )}
            {draw && <p className='game-result'>Empate</p>}
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
         </main>
         <footer className='flex-col-center restart-game-container'>
            {gameOver && (
               <button
                  className='restart-game flex-row-center'
                  onClick={restartGame}
               >
                  <ArrowCounterClockwise size={15} weight='bold' />
                  Reiniciar o jogo
               </button>
            )}
            <p>
               Desenvolvido por{' '}
               <a
                  href='https://github.com/philipeoliveira'
                  title='Abrir em nova aba o GitHub do autor Philipe Oliveira'
                  target='_blank'
               >
                  Philipe Oliveira
               </a>
               <ArrowSquareOut color={'var(--color-text)'} size='10' />
            </p>
         </footer>
      </div>
   );
}

export default App;
