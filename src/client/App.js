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
    try {
      const { data } = await axios.get('/api/items');
      const { items } = data;
      this.setState({ data: items, filteredData: items });
    } catch (e) {
      console.log(e);
    }
  }

  handleFilter = (e) => {
    const { data } = this.state;
    const str = e.target.value;
    const newFilterData = data.filter(({ name }) => name.includes(str));
    this.setState({ filteredData: newFilterData });
  }

  handleRemove = (id) => {
    const { menuData } = this.state;
    const newMenuData = menuData.filter(menuItem => menuItem.id !== id);
    this.setState({ menuData: newMenuData });
  }

  handleSelect = (item) => {
    const { id } = item;
    const { menuData } = this.state;
    const found = menuData.some(menuItem => menuItem.id === id);
    if (!found) {
      const newMenuData = menuData.concat(item);
      this.setState({ menuData: newMenuData });
    }
  }

  groupDietaries = (data) => {
    const group = {};
    data.forEach(({ dietaries }) => {
      dietaries.forEach((dietary) => {
        group[dietary] = group[dietary] + 1 || 1;
      });
    });

    return group;
  }

  render() {
    const { filteredData, menuData } = this.state;
    const menuDietaries = this.groupDietaries(menuData);
    return (
      <div className="wrapper">
        <Header {...menuDietaries} selectedTotal={menuData.length} />
        <div className="container menu-builder">
          <div className="row">
            <div className="col-4">
              <div className="filters">
                <input className="form-control" placeholder="Name" onChange={this.handleFilter} />
              </div>
              <ul className="item-picker">
                {filteredData.map(({ name, id, dietaries }) => (
                  <BasicCard
                    key={`sidebar-${id}`}
                    name={name}
                    dietaries={dietaries}
                    id={id}
                    handleSelect={this.handleSelect}
                  />
                ))}
              </ul>
            </div>
            <div className="col-8">
              <h2>Menu preview</h2>
              <ul className="menu-preview">
                {menuData.map(({ name, id, dietaries }) => (
                  <BasicCard
                    key={`menu-${id}`}
                    name={name}
                    dietaries={dietaries}
                    id={id}
                    withButton
                    handleRemove={this.handleRemove}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
