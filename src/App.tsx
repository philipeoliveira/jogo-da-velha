import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

type Players = 'O' | 'X';

function App() {
   const [turn, setTurn] = useState<Players>('O');
   const [winner, setWinner] = useState<Players | null>(null);
   const [draw, setDraw] = useState<boolean | null>(null);
   const [choices, setChoices] = useState<{ [key: string]: Players }>({});

   const createCells = () => {
      return new Array(9).fill(true);
   };

   const play = (index: number) => {
      setChoices((prev) => ({ ...prev, [index]: turn }));
      setTurn((prev) => (prev === 'O' ? 'X' : 'O'));
   };

   return (
      <div className='game-container'>
         <p>É a vez do jogador X</p>
         <p>O jogador X ganhou!</p>
         <p>Empate</p>
         <div className='game-board'>
            {createCells().map((_, i) => (
               <div className='board-cell' key={i} onClick={() => play(i)}>
                  {choices[i]}
               </div>
            ))}
         </div>
         <button>Reiniciar o jogo</button>
      </div>
   );
}

export default App;
