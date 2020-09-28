import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header';
import BasicCard from './components/BasicCard';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      filteredData: [],
      menuData: [],
    };
  }


  async componentDidMount() {
    const { data } = await axios.get('/api/items');
    console.log(data);
  }

  handleRemove = (id) => {
    console.log('remove', id);
  }

  handleSelect = (id) => {
    console.log('select', id);
  }

  render() {
    return (
      <div className="wrapper">
        <Header ve={3} v={6} n={9} selectedTotal={6} />
        <div className="container menu-builder">
          <div className="row">
            <div className="col-4">
              <div className="filters">
                <input className="form-control" placeholder="Name" />
              </div>
              <ul className="item-picker">
                <BasicCard name="temp" dietaries={['v', 've']} id={1001} handleSelect={this.handleSelect} />
              </ul>
            </div>
            <div className="col-8">
              <h2>Menu preview</h2>
              <ul className="menu-preview">
                <BasicCard name="temp" dietaries={['v', 've']} id={1002} withButton handleRemove={this.handleRemove} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
