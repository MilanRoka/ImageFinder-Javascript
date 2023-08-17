import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Search from './components/Search'
import Home from './components/Home'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" component={<Search/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
