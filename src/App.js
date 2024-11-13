import './App.css';
import Select from './Components/Select/Select';

const siList = Array.from({ length: 100 }, (_, i) => (
  {
    name: `Монтажник ${i + 1}`,
    id: i + 1,
  }
));

function App() {
  return (
    <div className='App'>
      <Select
        name='si'
        options={siList}
        onChange={e => {}}
      />
    </div>
  );
}

export default App;
