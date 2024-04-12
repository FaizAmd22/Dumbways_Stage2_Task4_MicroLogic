import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../assets/loading.svg";
import { IoFilterOutline } from "react-icons/io5";
// import { ChevronDownIcon } from '@heroicons/react/20/solid'

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }


const ListML = () => {
    const [datas, setDatas] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [allRole, setAllRole] = useState([])
    const [filteredRole, setFilteredRole] = useState('')
    const [activeRole, setActiveRole] = useState("");
    const [activeSpecialty, setActiveSpecialty] = useState("");
    const [allSpecialty, setAllSpecialty] = useState([])
    const [filteredSpecialty, setFilteredSpecialty] = useState('')
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const response = await axios.get("https://api.dazelpro.com/mobile-legends/hero")
                const data = response.data.hero
                const uniqueRoles = new Set();
                const uniqueSpeciallys = new Set();

                data.forEach(hero => {
                    const roles = hero.hero_role.split(',');

                    roles.forEach(role => {
                        uniqueRoles.add(role.trim());
                    });
                });

                setAllRole([...uniqueRoles])

                data.forEach(hero => {
                    const speciallys = hero.hero_specially.split(',');

                    speciallys.forEach(specially => {
                        uniqueSpeciallys.add(specially.trim());
                    });
                });

                setAllSpecialty([...uniqueSpeciallys])

                let filteredData = [...data];
                if (filteredRole) {
                    filteredData = filteredData.filter(item => item.hero_role.includes(filteredRole));
                }

                if (filteredSpecialty) {
                    filteredData = filteredData.filter(item => item.hero_specially.includes(filteredSpecialty));
                }

                if (search) {
                    filteredData = filteredData.filter(item => item.hero_name.toLowerCase().includes(search.toLowerCase()));
                }

                setDatas(filteredData);
            } catch (error) {
                console.error("Error fetching data. Please try again", error)
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            }
        }

        fetchData()
    }, [search, filteredRole, filteredSpecialty])

    console.log("search : ", search)
    console.log("allSpecialty : ", allSpecialty)
    console.log("filtered role : ", filteredRole)
    console.log("filtered specialty : ", filteredSpecialty)

    const handleDefault = () => {
        setFilteredRole("");
        setFilteredSpecialty("");
        setActiveRole("");
        setActiveSpecialty("");
    }

    const handleRole = (data) => {
        setFilteredRole(data);
        setActiveRole(data);
    };

    const handleSpecialty = (data) => {
        setFilteredSpecialty(data);
        setActiveSpecialty(data);
    };

    return (
        <div className="h-[95vh] flex flex-col m-auto gap-5 p-10 mt-10">
            <div className="h-[10vh] flex flex-col gap-5">
                <h1 className="font-bold text-center uppercase text-2xl">List Hero Mobile Legends</h1>

                <div className="w-[80vw] md:w-[60vw] flex justify-between items-center">
                    <label htmlFor="search" className="flex flex-col">
                        <input
                            type="text"
                            name="search"
                            placeholder="search by hero name"
                            className="bg-slate-200 w-[50vw] rounded-xl px-5 py-1"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </label>

                    <div className="relative inline-block text-left">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm p-4 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            id="options-menu"
                            aria-haspopup="true"
                            aria-expanded="true"
                        >
                            <IoFilterOutline />
                        </button>

                        {isOpen && (
                            <div
                                className="origin-top-right absolute right-0 mt-2 w-56 h-[65vh] overflow-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu"
                            >
                                <button className="w-[100%] py-2 bg-blue-500 text-white font-bold" onClick={handleDefault}>
                                    Default
                                </button>
                                <div className="py-1" role="none">
                                    <p className="font-semibold text-sm py-2 px-4 text-center">Roles</p>
                                    <button
                                        className={`w-[100%] block px-4 py-2 text-sm text-left hover:bg-gray-100 hover:text-gray-900 ${activeRole === "" ? "bg-blue-200" : ""}`}
                                        role="menuitem"
                                        onClick={() => handleRole("")}
                                    >
                                        All
                                    </button>
                                    {allRole.map((data, index) => {
                                        return (
                                            <button
                                                key={index}
                                                className={`w-[100%] block px-4 py-2 text-sm text-left hover:bg-gray-100 hover:text-gray-900 ${activeRole === data ? "bg-blue-200" : ""}`}
                                                role="menuitem"
                                                onClick={() => handleRole(data)}
                                            >
                                                {data}
                                            </button>
                                        )
                                    })}

                                    <br />
                                    <hr />

                                    <p className="font-semibold text-sm pt-3 pb-2 px-4 text-center">Specialty</p>
                                    <button
                                        className={`w-[100%] block px-4 py-2 text-sm text-left hover:bg-gray-100 hover:text-gray-900 ${activeSpecialty === "" ? "bg-blue-200" : ""}`}
                                        role="menuitem"
                                        onClick={() => handleSpecialty("")}
                                    >
                                        All
                                    </button>
                                    {allSpecialty.map((data, index) => {
                                        return (
                                            <button
                                                key={index}
                                                className={`w-[100%] block px-4 py-2 text-sm text-left hover:bg-gray-100 hover:text-gray-900 ${activeSpecialty === data ? "bg-blue-200" : ""}`}
                                                role="menuitem"
                                                onClick={() => handleSpecialty(data)}
                                            >
                                                {data}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="w-[60vw] h-[80vh] flex flex-col justify-center items-center">
                    <img src={Loading} className="w-[25%]" />
                    <p>Loading</p>
                </div>
            ) : datas.length === 0 ? (
                <div className="w-[60vw] h-[80vh] flex flex-col justify-center items-center">
                    <p>No data found</p>
                </div>
            ) : (
                <div className="w-[80vw] md:w-[60vw] h-[80vh] overflow-auto mt-5 flex flex-col gap-10">
                    {datas.map((data, index) => (
                        <div key={index} className="flex gap-10 items-center">
                            <div className="w-[20%]">
                                <img src="https://i.pinimg.com/564x/ea/1e/d1/ea1ed14327f20b2037fc7aea3ac523d4.jpg" alt="heroML" className="rounded-full w-[100%]" />
                            </div>

                            <div>
                                <h1>{data.hero_name}</h1>
                                <p>{data.hero_role}</p>
                                <p>{data.hero_specially}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ListML;