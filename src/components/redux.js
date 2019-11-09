import React from "react";
import {createStore} from "redux";
import axios from "axios";

const initialState = {
    data: null,
    loading: true
}

const reducer = (state = initialState, action) => {
    const copyOfStates = {...state};

    switch(action.type){

        case "FETCHDATA":
          
                const getData = async () => {
                    try{
                      const response = await axios.get("https://sidereumapi2.herokuapp.com/saerge/getData");
                      console.log(response)
                      if(response.status === 202){
                        copyOfStates.data = response;
                        copyOfStates.loading = false;
                        console.log(copyOfStates.data)
                      }
                    
                    }
                    catch(error){
                        console.log(error)
                    }
                  }
                  
                  getData();


        return copyOfStates;

        default:
         return copyOfStates;
    }

}

//fetch data
export const fetchData = () => {
    return{
        type: "FETCHDATA"
    }
}

export const store = createStore(reducer);