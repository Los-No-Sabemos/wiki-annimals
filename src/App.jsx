
import './App.css'
import { Route, Routes } from 'react-router-dom';
import  About  from './Pages/About'
import  Home  from './Pages/Home' 
import  AnimalDetails  from './Pages/AnimalDetails' 
import  CreateNewAnimal  from './Pages/CreateNewAnimal'
import Navbar from './components/Navbar';


function App() {

  return (
    <>
    
     <Navbar/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/AnimalDetails" element={<AnimalDetails/>}/>
      <Route path="/CreateNewAnimal" element={<CreateNewAnimal/>}/>    
      <Route path="/About" element={<About/>}/>        
       
      </Routes>
        
    </>
  )
}

export default App
