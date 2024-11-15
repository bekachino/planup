import Select from './Components/Select/Select';
import { useState } from 'react';
import './App.css';

const siList = Array.from({ length: 100 }, (_, i) => ({
  label: `Монтажник ${i + 1}`,
  id: i + 1,
}));

function App() {
  const [state, setState] = useState();

  return (
    <div className="App">
      <Select
        name="si"
        value={state?.label}
        options={siList}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
}

export default App;
