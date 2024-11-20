import { useState } from 'react';
import SearchFilters from './Components/SearchFilters/SearchFilters';
import './App.css';

function App() {
  const [state, setState] = useState();

  return (
    <div className="App">
      <SearchFilters placeholder="Поиск" />
    </div>
  );
}

export default App;
