import './App.css';
import Select from './Components/Select/Select';
import { useState } from 'react';

const siList = Array.from({ length: 100 }, (_, i) => ({
  name: `Монтажник ${i + 1}`,
  id: i + 1,
}));

function App() {
  const [state, setState] = useState(null);

  return (
    <div className="App">
      <Select
        name="si"
        value={state?.name}
        options={siList}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
}

export default App;
