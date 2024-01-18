import { useState } from "react";

const Salary = () => {
    const [salary, setSalary] = useState(null)
    const [allowance, setAllowance] = useState(null)
    const [costs, setCosts] = useState(null)
    const [gross, setGross] = useState(0)
    const [showSalary, setShowSalary] = useState(0)
    const [netSalary, setNetSalary] = useState(0)

    const handleSubmit = () => {
        setShowSalary(parseInt(salary))
        
        const getGross = parseInt(salary) + parseInt(allowance)
        setGross(parseInt(getGross))
        
        setNetSalary(parseInt(getGross) - parseInt(costs))
    }

    return (
        <div className="md:w-[80vw] h-[100vh] m-auto flex justify-center items-center">
            <div className="w-[100%] md:w-[90%] border-2 rounded-xl p-10 xl:p-20 flex flex-col text-center gap-10">
                <h1 className="font-bold text-3xl">Salary Calculating</h1>

                <div className="grid grid-cols-2 gap-10 md:gap-0">
                    <div className="flex flex-col justify-center items-start col-span-2 md:col-span-1 order-2 md:order-1">
                        <p className="font-bold text-xl pb-3">Hasil</p>

                        <div className="flex text-start gap-2">
                            <div>
                                <p>Gross Salary </p>
                                <p>Salary </p>
                                <p>Net Salary </p>
                            </div>

                            <div>
                                <p>: Rp. {gross}</p>
                                <p>: Rp. {showSalary}</p>
                                <p>: Rp. {netSalary}</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col text-start gap-5 col-span-2 md:col-span-1 order-1">
                        <label>
                            <p className="pl-3 font-semibold pb-1">Salary :</p>
                            <input type="number" placeholder="Input here" className="w-full shadow-md shadow-gray-300 rounded-2xl pl-5 py-1" onChange={(e) => setSalary(e.target.value)} />
                        </label>
                        <label>
                            <p className="pl-3 font-semibold pb-1">Allowance :</p>
                            <input type="number" placeholder="Input here" className="w-full shadow-md shadow-gray-300 rounded-2xl pl-5 py-1" onChange={(e) => setAllowance(e.target.value)} />
                        </label>
                        <label>
                            <p className="pl-3 font-semibold pb-1">Required Costs :</p>
                            <input type="number" placeholder="Input here" className="w-full shadow-md shadow-gray-300 rounded-2xl pl-5 py-1" onChange={(e) => setCosts(e.target.value)} />
                        </label>

                        <button className="bg-blue-500 mt-5 rounded-2xl text-white font-semibold py-1 hover:bg-white hover:text-blue-500 hover:shadow-lg transition-all duration-500 ease-in-out" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Salary;