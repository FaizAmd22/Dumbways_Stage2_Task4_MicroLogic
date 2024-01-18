import { BsFire } from "react-icons/bs";
import Datas from "../data/homeCards.json"
const Home = () => {
    return ( 
        <div className="container h-screen m-auto flex flex-col items-center py-10">
            <div className="flex flex-col justify-center items-center h-[20vh]">
                <h1 className="font-bold uppercase text-2xl">Challange on Task</h1>
                <div className="flex items-center gap-1">
                    <p>Just try one by one!</p>
                    <BsFire className="text-orange-400"/>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-10 py-10 pb-20">
                {Datas.map((data, index) => {
                    return (
                        <a
                            className="w-[40%] md:w-[25%] lg:w-[20%] h-[300px] lg:h-[350px] shadow-lg rounded-lg shadow-gray-400 cursor-pointer flex flex-col items-center justify-center text-center hover:bg-gray-700 hover:text-white transition-all duration-500 ease-in-out group p-5"
                            key={index}
                            href={data.path}
                        >
                            <div className="h-[50%] flex items-center mb-5">
                                <img src={data.image} alt={data.title} className="min-h-[30%] max-h-[100%] hover:transition-all hover:duration-500 hover:ease-in-out"/>
                            </div>

                            <div>
                                <h1 className="font-bold">{data.title}</h1>
                                <p className="text-sm font-light group-hover:block md:hidden hover:transition-all hover:duration-0 hover:ease-in-out">{data.description}</p>
                            </div>
                        </a>
                    )
                })}
            </div>
        </div>
     );
}
 
export default Home;