import React, { Component } from 'react';
import './App.css';
import FieldSelectContainer from "./components/FieldSelect/containers/FieldSelectContainer";
import DataTableContainer from './components/DataTable/containers/DataTableContainer';
import Logo from './components/Logo/views/Logo';
import HoverEasterEgg from './EasterEggs/Hover/Hover';

class App extends React.Component {
  render() {
      return (
      <div className="App">
        <Logo/>
        <FieldSelectContainer />
        <DataTableContainer />

        {/*Easter Eggs: These aren't necessary...and can be turned off by removing them.*/}
        <HoverEasterEgg />
      </div>
    );
  }
}

export default App;
