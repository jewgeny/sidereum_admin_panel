import React, {useEffect, createContext, useState} from 'react';
import Sidebar from "./components/Sidebar/Sidebar";
import axios from "axios";
import Selection from "./components/Products/Selection";
import "./App.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Saerge from "./components/Products/Saerge/Saerge";
import Urnen from "./components/Products/Urnen/Urnen";
import Floristik from "./components/Products/Floristik/Floristik";


export const contextData = createContext();

const App = () => {

    return(
    <>
    <Router>
      <div className="mainWrapper">
       
            <Route exact path="/"   render={() => <Selection />} />
            <Route  path="/saerge" render={() => <Saerge />} />
            <Route  path="/urnen" render={() => <Urnen />} />
            <Route  path="/floristik" render={() => <Floristik />} />
            <Route   path="/" render={() => <Sidebar />} /> 
        
      </div>
      </Router>
      </>
    );
  
}

export default App;
