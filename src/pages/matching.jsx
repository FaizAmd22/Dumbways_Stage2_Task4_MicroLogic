import { useEffect } from "react";
import { useState } from "react";
import { BsFire } from "react-icons/bs";

const Matching = () => {
    const icons = ["🐱‍👤", "🐱‍🚀", "🐱‍🏍", "🐱‍🐉", "👀", "🤷‍♀️", "🤦‍♂️", "🐱‍👓"];
    const [cards, setCards] = useState([]);
    const [flip, setFlip] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [won, setWon] = useState(false);
    const [started, setStarted] = useState(false);
    const [isShowCards, setIsShowCards] = useState(true)


    useEffect(() => {

        if (started) {
            setTimeout(() => {
                setIsShowCards(false)
            }, 500);
        }
    }, [started, isShowCards])


    const shuffle = (array) => {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    };

    const startGame = () => {
        const shuffledCards = shuffle([...icons, ...icons]);
        setCards(shuffledCards);
        setFlip([]);
        setMatchedPairs([]);
        setWon(false);
        setStarted(true);
        setIsShowCards(true)

        if (started) {
            setTimeout(() => {
                setIsShowCards(false)
            }, 500);
        }
    };

    const handleCardClick = (index) => {
        if (!started) {
            return;
        }

        if (flip.length === 2 || flip.includes(index) || matchedPairs.includes(cards[index])) {
            return;
        }

        const newflip = [...flip, index];
        setFlip(newflip);

        if (newflip.length === 2) {
            setTimeout(() => checkMatch(newflip), 200);
        }
    };

    const checkMatch = (flip) => {
        const [firstIndex, secondIndex] = flip;
        const isMatch = cards[firstIndex] === cards[secondIndex];

        if (isMatch) {
            setMatchedPairs([...matchedPairs, cards[firstIndex]]);
            if (matchedPairs.length === icons.length - 1) {
                setWon(true);
            }
        }

        setTimeout(() => setFlip([]), 200);
    };

    const handleTryAgain = () => {
        setStarted(false);
        startGame();
    };

    const renderCards = () => {
        return (
            <div className="grid grid-cols-4 gap-8">
                {cards.map((card, index) => (
                    <div key={index} className="mb-3">
                        {isShowCards ? (
                            <button
                                className={`w-[70px] md:w-full h-[50px] bg-primary rounded-md shadow-md shadow-primary text-white bg-blue-500 hover:bg-blue-400 transition-all duration-500 ease-in-out`}
                            >
                                {card}
                            </button>
                        ) : (
                            <button
                                className={`w-[70px] md:w-full h-[50px] bg-primary rounded-md shadow-md shadow-primary text-white bg-blue-500 hover:bg-blue-400 transition-all duration-500 ease-in-out ${flip.includes(index) || matchedPairs.includes(card) && ''}`}
                                onClick={() => handleCardClick(index)}
                            >
                                {flip.includes(index) || matchedPairs.includes(card) ? card : '?'}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="md:w-[80vw] h-[100vh] m-auto flex items-center justify-center">
            <div className="w-full h-full p-10 flex flex-col justify-center">
                <h1 className="text-center mb-10 font-bold text-3xl">Matching Game</h1>
                {renderCards()}
                {!started && (
                    <div className="mt-5 gap-3 flex items-center justify-center">
                        <button
                            className="bg-gray-700 text-white p-2 px-10 rounded-md hover-bg-primary text-sm hover:bg-gray-500 transition-all duration-500 ease-in-out"
                            onClick={startGame}
                        >
                            Start Game
                        </button>
                    </div>
                )}
                {(started && !won) ? (
                    <div className="flex items-center justify-center m-7">
                        <button
                            className="bg-gray-700 px-10 py-1 rounded-md text-white hover:bg-gray-500 transition-all duration-500 ease-in-out"
                            onClick={handleTryAgain}
                        >
                            Reset
                        </button>
                    </div>
                ) : won}
                {won && (
                    <div className="flex flex-col items-center mt-10 gap-3">
                        <h3 className="font-bold flex items-center gap-1 text-2xl">You Win! <BsFire className="text-orange-500" /></h3>
                        <button
                            className="bg-gray-700 text-white p-2 px-10 rounded-md text-sm hover:bg-gray-500 transition-all duration-500 ease-in-out"
                            onClick={handleTryAgain}
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Matching;