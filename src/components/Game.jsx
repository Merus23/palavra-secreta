import React from 'react';
import { useState, useRef } from 'react';
import './Game.css';
  
const Game = ({verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score}) => {
  
  const [letter, setLetter] = useState('');
  const letterInput = useRef(null);

  const handleSumit = (e) =>{
    e.preventDefault();
    verifyLetter(letter);
    setLetter('');
    letterInput.current.focus();
  }
  return (
    <div className="game">
      <p className="points">
        <span>Pontuação : {score}</span>        
      </p>
      <h1>Adivinhe a palavra</h1>
      <h3 className='tip'>
        Dica sobre a palavra <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativas</p>
      <div className="wordConteiner">
        {letters.map((letter, index) => (
          guessedLetters.includes(letter) ? (
            <span key={index}className="letter">
              {letter}
            </span>
          ):(
            <span key={index} className="blankSquare"></span>
          )
        ))}
      </div>
      <div className="letterContainer">
        <p>Tente adivinha uma letra da palavra:</p>
        <form onSubmit={handleSumit}>
          <input 
            type="text" 
            name='letter' 
            onChange={(e) => setLetter(e.target.value)} 
            className='letter' 
            value={letter} 
            maxLength="1" 
            required 
            ref={letterInput}
          />
            
          <button>jogar</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas</p>
        {wrongLetters.map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </div>
    </div>
  )
}

export default Game
