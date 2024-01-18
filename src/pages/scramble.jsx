import { useState, useEffect } from 'react';

const Scramble = () => {
    const words = ['react', 'javascript', 'laravel', 'frontend', 'backend', 'tailwind'];

    const [original, setOriginal] = useState('');
    const [scrambled, setScrambled] = useState('');
    const [userInput, setUserInput] = useState('');
    const [score, setScore] = useState(0);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * words.length);
        const selectedWord = words[randomIndex];

        setOriginal(selectedWord);
        setScrambled(scramble(selectedWord));
    }, []);

    const scramble = (word) => {
        const scrambledArray = word.split('').sort(() => Math.random() - 0.5);
        return scrambledArray.join('');
    };

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isCorrectGuess = userInput.toLowerCase() === original;
        const randomIndex = Math.floor(Math.random() * words.length);
        const selectedWord = words[randomIndex];

        if (isCorrectGuess) {
            setScore((prevScore) => prevScore + 1);
        }

        setOriginal(selectedWord);
        setScrambled(scramble(selectedWord));
        setUserInput('');
    };


    return (
        <div className='w-[80vw] h-[100vh] flex justify-center items-center'>
            <div className='w-[90%] flex flex-col gap-5'>
                <h1 className='font-bold text-3xl text-center'>Scramble Word Game</h1>

                <div className='flex flex-col justify-center items-center gap-5'>
                    <p className='my-5 font-semibold'>Score: {score}</p>
                    <p>The word : <b>{scrambled}</b></p>
                    <label className='w-[50%] flex flex-col items-center'>
                        <input type="text" value={userInput} placeholder="Input your guess" onChange={handleInputChange} className='w-full shadow-lg shadow-gray-300 rounded-xl pl-5 py-1' />
                    </label>
                    <button onClick={handleSubmit} className="w-[50%] bg-blue-500 mt-5 rounded-2xl text-white font-semibold py-1 hover:bg-white hover:text-blue-500 hover:shadow-lg transition-all duration-500 ease-in-out" >Submit</button>
                </div>
            </div>
        </div>
    );
};

export default Scramble;