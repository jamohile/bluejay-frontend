import React, { Component } from 'react';
import './App.css';
import FieldSelectContainer from "./components/FieldSelect/containers/FieldSelectContainer";
import DataTableContainer from './components/DataTable/containers/DataTableContainer';
import Logo from './components/Logo/views/Logo';
import HoverEasterEgg from './EasterEggs/Hover/Hover';
import { configureAPI } from './utilities/network/network';
import DataSearchContainer from './components/DataSearch/containers/DataSearchContainer';

class App extends React.Component {
  constructor(props:any){
    super(props);
    configureAPI();
  }
  render() {
      return (
      <div className="App">
        <Logo/>
        <FieldSelectContainer />
        <DataSearchContainer/>
        <DataTableContainer />

        {/*Easter Eggs: These aren't necessary...and can be turned off by removing them.*/}
        <HoverEasterEgg />
      </div>
    );
  }
}

export default App;
