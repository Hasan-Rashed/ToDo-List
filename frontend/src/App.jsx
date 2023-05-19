import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import UpdateToDo from './components/UpdateToDo';
import NotFound from './components/NotFound';

function App() {

  return (
    <div className='bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/goal/update/:id" element={<UpdateToDo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
