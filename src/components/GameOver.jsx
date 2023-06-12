import React from 'react';
import './GameOver.css';

const GameOver = ({retry, score}) => {
  return (
    <div className='gameover'>
      <h1>Fim de jogo</h1>
      <p>Sua pontuação foi: {score} </p>
      <button onClick={retry}>Reiniciar o jogo</button>
    </div>
  )
}

export default GameOver
