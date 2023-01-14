import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
   const createCells = () => {
      return new Array(9).fill(true);
   };

   return (
      <div className='game-container'>
         <p>É a vez do jogador X</p>
         <p>O jogador X ganhou!</p>
         <p>Empate</p>
         <div className='game-board'>
            {createCells().map((_, i) => (
               <div className='board-cell' key={i}></div>
            ))}
         </div>
         <button>Reiniciar o jogo</button>
      </div>
   );
}

export default App;
