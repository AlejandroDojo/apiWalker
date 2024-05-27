import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Menu from './Menu/Menu';
import Result from './Result/Result';

function App() {

  const [api, setApi] = useState({});
  const [search, setSearch] = useState('people');

  useEffect(() => {
    const apiCall = () => {
      axios.get("https://swapi.dev/api/")
        .then(response => setApi(response.data));
    }
    apiCall();
  }, [])

  
  return (
    <div className="app">
      <nav>
        <Menu api={api} setSearch={setSearch}/>
      </nav>
      <Routes>
        <Route path='/' element={<div>
          Selecciona una opcion y una ID 
        </div>}/>
        <Route path={`/:id`} element={<Result search={search}/>}/>

      </Routes>
    </div>  
  );
}

export default App;
