
import './App.css'
import { Route, Routes } from 'react-router-dom';
import  About  from './Pages/About'
import  Home  from './Pages/Home' 
import  AnimalDetails  from './Pages/AnimalDetails' 
import  CreateNewAnimal  from './Pages/CreateNewAnimal'
import  UpdateAnimal  from './Pages/UpdateAnimal'


function App() {

  return (
    <>
      <div>ELIANA AND FLORIAN ANNIMAL WORLD AND A BUNNY</div>

      <Routes>

      <Route path="/" element={<Home/>}/>
      <Route path="/AnimalDetails/:id" element={<AnimalDetails />} />
      <Route path="/CreateNewAnimal" element={<CreateNewAnimal/>}/> 
      <Route path="/UpdateAnimal/:id" element={<UpdateAnimal />} />  
      <Route path="/About" element={<About/>}/>        
       
      </Routes>
        
    </>
  )
}

export default App
