import Navbar from './components/Navbar'
import EventDetailsPage from './pages/EventDetailsPage'
import Home from './pages/Home'
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {


  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/eventpage' element={<EventDetailsPage />} />
          <Route path='' element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
