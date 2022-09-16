import React, { createContext, useState } from 'react'
import {BrowserRouter as Routers,Routes,Route} from 'react-router-dom';
import Details from './Components/Details';
import Map from './Components/Map';

export const Context =createContext();
const App = () => {
  const [selected,setSelected] = useState();
  return<>
    <Routers>
      <Context.Provider value={{selected,setSelected}}>
      <Routes>
       <Route path='/' element={<Map/>}/>
       <Route path='/detail' element={<Details/>}/>
      </Routes>
      </Context.Provider>
    </Routers>
  </>
}

export default App