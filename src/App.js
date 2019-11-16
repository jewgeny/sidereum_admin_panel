import React from 'react';
import Sidebar from "./components/Sidebar/Sidebar";
import axios from "axios";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: ""
    }
  }

  componentDidMount() {
    const dataFetcher = async () => {
      const response = await fetch('https://sidereumapi2.herokuapp.com/saerge/getData');
      const data = await response.json();
      this.setState({ data })
      return data;
    }
    dataFetcher()

  }


  render() {
    const { data } = this.state;
    return (
      <div>
        <div>
          {
            data ? data.map((elem, index) => {
              return (
                <ul key={index}>
                  <li> {elem.titel} </li>
                  <li> {elem.price} </li>
                  <li> {elem.category} </li>
                </ul>
              );
            }) : "Data nicht da!"
          }
        </div>
      </div>
    );
  }

}

export default App;
