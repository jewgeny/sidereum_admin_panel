import React from 'react';
import Sidebar from "./components/Sidebar/Sidebar";
import axios from "axios";
import Selection from "./components/Products/Selection";
import "./App.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Saerge from "./components/Products/Saerge/Saerge";


class App extends React.Component {

  state = {
      data: null,
      loading: true
  }

  componentDidMount(){

    const getData = async () => {
      try{
        const response = await axios.get("https://sidereumapi2.herokuapp.com/saerge/getData");
        console.log(response)
        this.setState({data: response.data, loading: false})
      }
      catch(error){
          console.log(error)
      }
    }
    
    getData();
        
           
  }

  render(){
   
    return (
    <>
    <Router>

      <div className="mainWrapper">
          <Route exact path="/"   render={() => <Selection />} />
          <Route  path="/saerge" render={() => <Saerge 
                  data={this.state.data} 
                  loading={this.state.loading}

          />} />
          <Route   path="/" render={() => <Sidebar />} /> 
      </div>
      </Router>
      </>
    );
  }
  
}

export default App;
