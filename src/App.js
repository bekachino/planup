import { useState } from 'react';
import './App.css';
import SearchFilters from './Components/SearchFilters/SearchFilters';

const siList = Array.from({ length: 100 }, (_, i) => ({
  label: `Монтажник ${i + 1}`,
  id: i + 1,
}));

function App() {
  const [state, setState] = useState();

  return (
    <div className="App">
      <SearchFilters placeholder="Поиск" />
    </div>
  );
}

export default App;
