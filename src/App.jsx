import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Convert from './pages/convert'
import Countdown from './pages/countdown'
import Home from './pages/home'
import ListML from './pages/list_ml'
import Matching from './pages/matching'
import NotFound from './pages/notFound'
import Salary from './pages/salary'
import Scramble from './pages/scramble'
import Tictactoe from './pages/tictactoe'

function App() {
  const location = window.location.pathname
  console.log(location)
  const hideNavbar = location === '/'

  return (
    <Router>
      <div className='flex flex-col md:flex-row'>
        {!hideNavbar && <Navbar />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/countdown' element={<Countdown />} />
          <Route path='/convert' element={<Convert />} />
          <Route path='/list-ml' element={<ListML />} />
          <Route path='/tictactoe' element={<Tictactoe />} />
          <Route path='/matching-card' element={<Matching />} />
          <Route path='/salary-calc' element={<Salary />} />
          <Route path='/word-scramb' element={<Scramble />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
