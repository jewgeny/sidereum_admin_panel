import React from 'react';
import Sidebar from "./components/Sidebar/Sidebar";
import axios from "axios";

class App extends React.Component {

  state = {
      data: null
  }

  componentDidMount(){

    const getData = async () => {
      try{
        const response = await axios.get("https://sidereumapi2.herokuapp.com/saerge/getData");
        console.log(response)
        this.setState({data: response})
        console.log(this.state.data)
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
        {this.state.data  ?
            this.state.data.data.map((elem, index) => {
              return(
                  <ul style={{marginLeft: "500px"}} key={index}>
                      <li>{elem.titel}</li>
                      <li>{elem.price}</li>
                      <li>{elem.category}</li>
                  </ul>
              )
          })
            :   
            <h1 style={{fontSize: "30px", marginLeft: "500px"}}>data is loading</h1>
        }
       <Sidebar />
      </div>
    );
  }
  
}

export default App;
