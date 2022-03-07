import React, { useState } from 'react';
import { Dropdown } from './components/dropdown/Dropdown';

function App() {
  const [selectedPokemon, SetSelectedPokemon] = useState(null);

  return (
    <div className="App">
      {selectedPokemon && (<span>Your Selected Pokemon: <h5>{selectedPokemon}</h5></span>)}
      <Dropdown
        title="Select your initial Pokemon"
        options={['Bulbasaur', 'Squirtle', 'Sharizard']}
        onSelect={SetSelectedPokemon}
      />
    </div>
  );
}

export default App;
