import { useState, useEffect } from 'react'
import { HiSparkles } from "react-icons/hi";

function Countdown() {
    const [endTime, setEndTime] = useState('')
    const [duration, setDuration] = useState(0)
    const [counting, setCounting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        let timer

        if (counting && duration > 0) {
            timer = setInterval(() => {
                setDuration((prevTime) => {
                    console.log("prevtime", prevTime)
                    return prevTime - 1
                })
            }, 1000)
        }

        return () => {
            clearInterval(timer)
        }
    }, [counting, duration])

    const startCountdown = () => {
        const now = new Date().getTime() / 1000
        const endTimeInSeconds = new Date(endTime).getTime() / 1000

        if (!endTime || endTimeInSeconds <= now) {
            setErrorMessage("Please select a valid future date and time!")
            return
        }

        setCounting(true)
        setErrorMessage('')
        setDuration(endTimeInSeconds - now)
    }

    const stopCountdown = () => {
        setCounting(false)
    }

    const resetCountdown = () => {
        setCounting(false)
        setEndTime('')
        setDuration(0)
        setErrorMessage('')
    }

    const handleEndTimeChange = (event) => {
        setEndTime(event.target.value)
    }

    const formatTime = (seconds) => {
        const months = Math.floor(seconds / (3600 * 24 * 30))
        const days = Math.floor(seconds / (3600 * 24))
        const hours = Math.floor((seconds % (3600 * 24)) / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const inSeconds = Math.floor(seconds % 60)

        return `${months ? `${months} months,` : ""} ${days} days, ${hours} hours, ${minutes} minutes, ${inSeconds} seconds`
    }

    return (
        <div className='md:w-[80vw] h-[100vh] flex justify-center items-center'>
            <div className='w-[90%] xl:w-[60%] border-2 rounded-xl p-10 flex flex-col text-center gap-10'>
                <h2 className='font-bold text-3xl mb-10 pt-10 md:pt-0'>Countdown Timer</h2>

                <div className='grid grid-cols-2'>
                    <div className='col-span-2 md:col-span-1 flex justify-center items-center order-2 md:order-1 pt-10 px-10 text-center' >
                        {errorMessage && <p className='text-red-500 text-center font-bold'>{errorMessage}</p>}
                        {duration > 0 ? (
                            <div>
                                <p className='text-center font-bold'>Time Remaining: </p>
                                <p>{formatTime(duration)}</p>
                            </div>
                        ) : duration == 0 ? null :
                            <p className='text-center font-bold flex items-center'>Countdown Complete! <HiSparkles className='ml-2 text-yellow-500' /></p>}
                    </div>

                    <div className='col-span-2 md:col-span-1 flex flex-col justify-center items-center order-1'>
                        <label className='flex flex-col justify-center items-center font-semibold'>
                            Set Countdown End Time:
                            <input type="datetime-local" value={endTime} onChange={handleEndTimeChange} className="border-2 border-gray-400  rounded-lg my-2 py-2 px-2" />
                        </label>

                        <div className='flex gap-3 pt-2 font-semibold'>
                            <button onClick={startCountdown} disabled={counting} className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:shadow-lg hover:shadow-gray-400 hover:bg-white hover:text-blue-500 transition-all duration-500 ease-in-out disabled:bg-blue-500 disabled:text-white disabled:shadow-none">
                                Start
                            </button>

                            <button onClick={stopCountdown} disabled={!counting} className="bg-gray-500 text-white px-4 py-1 rounded-lg hover:shadow-lg hover:shadow-gray-400 hover:bg-white hover:text-gray-500 transition-all duration-500 ease-in-out disabled:bg-gray-500 disabled:text-white disabled:shadow-none">
                                Pause
                            </button>

                            <button onClick={resetCountdown} className="bg-red-500 text-white px-4 py-1 rounded-lg hover:shadow-lg hover:shadow-gray-400 hover:bg-white hover:text-red-500 transition-all duration-500 ease-in-out disabled:bg-red-500 disabled:text-white disabled:shadow-none">Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Countdown;
