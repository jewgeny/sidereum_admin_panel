import React from 'react';
import Sidebar from "./components/Sidebar/Sidebar";
import axios from "axios";

class App extends React.Component {

  componentDidMount(){
      const getData = async () => {
          try{
              const response = axios.get("https://sidereumapi.netlify.com/");
              console.log("response", response);
          }
          catch(error){
             console.log(error)
          }
      }

      getData();
  }

  render(){
    return (
      <div>
       <Sidebar />
      </div>
    );
  }
  
}

export default App;
