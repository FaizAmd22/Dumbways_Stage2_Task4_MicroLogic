import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { BsFileWordFill } from "react-icons/bs";
import { PiClockCountdownFill } from "react-icons/pi";
import { BsCurrencyExchange } from "react-icons/bs";
import { PiGameControllerFill } from "react-icons/pi";
import { ImCalculator } from "react-icons/im";
import { GiCardRandom } from "react-icons/gi";
import { GiTicTacToe } from "react-icons/gi";

const Navbar = () => {
    return (
        <div className="w-[100vw] md:w-[20vw] h-[10vh] md:h-[100vh] bg-gray-700 text-white p-5">
            <ul>
                <li>
                    <a href="/" className="flex items-center hover:text-blue-500 font-bold transition-all duration-500 ease-in-out gap-2 border-b py-4"><IoHome className="text-2xl" /> Home</a>
                </li>
            </ul>
            <ul className="py-5 gap-6 flex flex-col group font-semibold">
                <li className="group-hover:text-gray-400">
                    <Link className="flex gap-2 items-center hover:text-white transition-all duration-500 ease-in-out" to={'/countdown'}><PiClockCountdownFill className="text-2xl hidden lg:block" />Countdown</Link>
                </li>
                <li className="group-hover:text-gray-400">
                    <Link className="flex gap-2 items-center hover:text-white transition-all duration-500 ease-in-out" to={'/convert'}><BsCurrencyExchange className="text-2xl hidden lg:block" />Currency Convert</Link>
                </li>
                <li className="group-hover:text-gray-400">
                    <Link className="flex gap-2 items-center hover:text-white transition-all duration-500 ease-in-out" to={'/list-ml'}><PiGameControllerFill className="text-2xl hidden lg:block" />Mobile Legends</Link>
                </li>
                <li className="group-hover:text-gray-400">
                    <Link className="flex gap-2 items-center hover:text-white transition-all duration-500 ease-in-out" to={'/tictactoe'}><GiTicTacToe className="text-2xl hidden lg:block" />Tic Tac Toe</Link>
                </li>
                <li className="group-hover:text-gray-400">
                    <Link className="flex gap-2 items-center hover:text-white transition-all duration-500 ease-in-out" to={'/matching-card'}><GiCardRandom className="text-2xl hidden lg:block" />Matching Card</Link>
                </li>
                <li className="group-hover:text-gray-400">
                    <Link className="flex gap-2 items-center hover:text-white transition-all duration-500 ease-in-out" to={'/salary-calc'}><ImCalculator className="text-2xl hidden lg:block" />Salary Calculating</Link>
                </li>
                <li className="group-hover:text-gray-400">
                    <Link className="flex gap-2 items-center hover:text-white transition-all duration-500 ease-in-out" to={'/word-scramb'}><BsFileWordFill className="text-2xl hidden lg:block" />Word Scramb</Link>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;