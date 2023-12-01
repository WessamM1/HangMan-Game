import styles from "./Keyboard.module.css"

type KeyboardProps ={
    activeLetters : string[]
    inactiveLetters: string[]
    addGuessedLetter : (letter : string)=> void
    disabled? : boolean
}

const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

for(let i = 0; i < alphabet.length; i++){
    alphabet[i] =  alphabet[i].toLocaleLowerCase();
}
export function Keyboard({disabled=false,activeLetters,inactiveLetters,addGuessedLetter}:KeyboardProps){
    return (
    <div style={{ 
        display:"grid", 
        gridTemplateColumns:"repeat(auto-fit, minmax(75px, 1fr))",
        gap : ".5rem"
}}> 
    {alphabet.map(key => {
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);
        return (
            <button onClick={() => addGuessedLetter(key)} 
            className={`${styles.btn} ${isActive ? styles.active : ""}
            ${ 
                isInactive ? styles.inactive : "" 
            }`} 
            disabled = {isInactive || isActive || disabled}
            key={key}
            >
          {key}</button>
        )
    })}

</div>
)
}