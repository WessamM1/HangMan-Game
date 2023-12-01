import { useCallback, useEffect, useState } from "react"
import words from "./wordList.json"
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";

function getword() : string {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  // get a random word from the WordList
  const [wordToGuess, setWordToGuess]= useState(getword);
  
  //initialize guessedLetters to empty array
  const [guessedLetters, setGuessedLetters]= useState<string[]>([])
  //array of strings of wrong letters
  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter));

  //call from useEffect to determine whether the letter is being added or not
  const addGuessedLetter = useCallback( (letter: string)=> {
    if(guessedLetters.includes(letter) || isLoser || isWinner ) return

    setGuessedLetters(currentLetters => [...currentLetters, letter])
  },[guessedLetters,isLoser,isWinner]);

  useEffect(() => {
    const handler = (e : KeyboardEvent) => {
    const key = e.key
    if(!key.match(/^[a-z]$/)) return

    e.preventDefault()
    addGuessedLetter(key);
  }

  document.addEventListener("keypress", handler);
  return () => {
  document.removeEventListener("keypress", handler);
  }
},[guessedLetters])

useEffect(() => {
  const handler = (e : KeyboardEvent) => {
    const key = e.key
    if(key !== "Enter" || ( !isWinner  && !isLoser) ) return
  
    e.preventDefault()
    setGuessedLetters([]);
    setWordToGuess(getword());
  }

document.addEventListener("keypress", handler);
return () => {
  document.removeEventListener("keypress", handler);
}
},[guessedLetters])

  return( 
    <div 
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin : "0 auto",
        alignItems: "center"
}}>
  <div style={{ fontSize: "2rem", textAlign : "center" }}>
    {isWinner && "Winner! - refresh the page to try again"}
    {isLoser && "Loser! - refresh the page to try again"}
    </div>
 
    <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
    <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
    <div style={{ alignSelf:"stretch" }}>
    <Keyboard disabled ={isWinner || isLoser} activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
    inactiveLetters={incorrectLetters}
    addGuessedLetter={addGuessedLetter}
    />
    
    </div>
</div>
 )
}

export default App
