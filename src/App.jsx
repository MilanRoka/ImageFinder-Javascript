import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Search from './components/Search'
import Home from './components/Home'
import Section from './components/Section'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" component={<Search/>} />
        <Route path="/section" component={<Section/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
