import { useState, useEffect } from 'react';

const Convert = () => {
    const [amount, setAmount] = useState(null)
    const [fromCurrency, setFromCurrency] = useState('USD')
    const [toCurrency, setToCurrency] = useState('EUR')
    const [convert, setConvert] = useState(null)
    const [exchangeRates, setExchangeRates] = useState(null)

    const currencies = ['USD', 'EUR', 'GBP', 'IDR']

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://open.er-api.com/v6/latest/${fromCurrency}`
                )
                const data = await response.json()

                setExchangeRates(data.rates)
            } catch (error) {
                console.error('Error fetching exchange rates:', error)
            }
        }

        fetchData()
    }, [fromCurrency])

    const convertCurrency = () => {
        if (exchangeRates) {
            const converted = (amount * exchangeRates[toCurrency]).toFixed(2)
            setConvert(converted)
        }
    }

    const handleAmountChange = (e) => {
        setAmount(e.target.value)
    }

    const handleFromCurrencyChange = (e) => {
        setFromCurrency(e.target.value)
        setConvert(null)
    }

    const handleToCurrencyChange = (e) => {
        setToCurrency(e.target.value)
        setConvert(null)
    }

    return (
        <div className='md:w-[80vw] h-[100vh] flex justify-center items-center'>
            <div className='w-[90%] lg:w-[60%] border-2 rounded-xl p-20 flex flex-col text-center gap-10'>
                <h2 className='font-bold text-3xl'>Currency Converter</h2>

                <div>
                    <input type="number" value={amount} placeholder="Input Amount Here" onChange={handleAmountChange} className="w-full shadow-md shadow-gray-300 pl-5 pr-16 py-2 rounded-3xl" />
                </div>

                <div className='w-full flex justify-evenly items-center font-bold'>
                    <select value={fromCurrency} onChange={handleFromCurrencyChange} className="bg-gray-500 text-white p-2 rounded-lg cursor-pointer">
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>

                    <p>To</p>

                    <select value={toCurrency} className="bg-gray-500 text-white p-2 rounded-lg cursor-pointer" onChange={handleToCurrencyChange}>
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </div>

                <button onClick={convertCurrency} className="bg-blue-500 text-white px-10 py-2 rounded-lg hover:bg-white hover:text-blue-500 hover:shadow-xl transition-all duration-500 ease-in-out font-bold">Convert</button>


                <div className='font-semibold '>
                    <p className='mb-1'>Result :</p>
                    <p className='w-full h-[40px] border-2 border-gray-300 rounded-lg flex justify-center items-center'>
                        {convert && (<p>{convert} {toCurrency}</p>)}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Convert;