import './App.css';
import { useCallback, useEffect, useState } from 'react';

import { wordsList } from './data/words';
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';


const stages = [
  {id: 1, name:'start'},
  {id: 2, name:'game'},
  {id: 3, name:'end'},
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words, setWord] = useState(wordsList);
  
  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() =>{
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    return {word, category};
  }, [words]);

  const startGame = useCallback(() => {
    clearLetterState();

    const {word, category} = pickWordAndCategory();
    let wordLetters = word.split('');
    wordLetters = wordLetters.map((letter) => letter.toLowerCase());
    
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)
    setGameStage(stages[1].name);

    // console.log(word);
    // console.log(category);
    // console.log(wordLetters);
  }, [pickWordAndCategory]);

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();
    
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    }
    
    
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [...actualGuessedLetters, normalizedLetter]);
    }else{
      setWrongLetters((actualWrongLetters) => [...actualWrongLetters, normalizedLetter]);
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  
  }

  function clearLetterState(){
    setGuessedLetters([]);
    setWrongLetters([]);
    
  }

  useEffect(() => {
    if(guesses <= 0){

      clearLetterState();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  useEffect(() => {

    const uniqueLetters = [...new Set(letters)];
    if(guessedLetters.length === uniqueLetters.length){
      setScore((actualScore) => actualScore + 100);
      startGame();
    }

  }, [guessedLetters, letters, startGame]);

  const retry = () =>{
    setScore(0);
    setGuesses(3);

    setGameStage(stages[0].name);
    // console.log('reiniciou o jogo');
  }



  return (
    <div className='App'>
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && 
        <Game  
          verifyLetter={verifyLetter} 
          pickedWord={pickedWord} 
          pickedCategory={pickedCategory}  
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
        }      
      {gameStage === 'end' && <GameOver retry={retry} score={score}/>}
      
    </div>
  )
}

export default App;
