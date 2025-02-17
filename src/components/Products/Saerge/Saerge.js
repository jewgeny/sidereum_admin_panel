import React, {useState, useEffect, useContext} from "react";
import { Table } from 'react-bootstrap';
import "../../styles/products.css";
import { FadeLoader} from 'react-spinners';
import ConfigDropMenu from "../ConfigDropMenu";
import { FaTrashAlt, FaPencilAlt, FaPlusCircle } from "react-icons/fa";
import "../../styles/navbar.css";
import { FaAngleRight, FaThLarge} from "react-icons/fa";
import axios from "axios"; 
import Button from '@material-ui/core/Button';
import  ModalBoxNewProduct from "./ModalBoxNewProduct";
import ModalBoxUpdateProduct from "./ModalBoxUpdateProduct";
import {contextData} from "../../../App";



const list = [
    {icon: <FaAngleRight/>, titel: "Alle Särge"},
    {icon: <FaAngleRight/>, titel: "Kiefersärge"},
    {icon:  <FaAngleRight/>, titel: "Pappelsärge"},
    {icon:  <FaAngleRight/>, titel: "Eichensärge"},
    {icon:  <FaAngleRight/>, titel: "Designersärge"},
 ]

 const override = `
 display: block;
 margin: 25px auto;
 border-color: #1E9CDC;
`;

let updateUseeEffect = 0;

const Saerge = (props) => {
    let dataStore = JSON.parse(localStorage.getItem("storage"));
    let [data, setProducts] = useState(dataStore || null);
    let [loading, setLoading] = useState(true);
    let [showNewProductModal, setShowNewProductModal] = useState(false);
    let [showUpdateProduct, setshowUpdateProduct] = useState(false);
    let [itemIdent, setItemIdent] = useState(null);
    let tempArray = [];
    tempArray = useContext(contextData);

    
    useEffect(() => {
/*
       if(tempArray.resData){
        tempArray = tempArray.resData.filter(elems => elems.type === "sarg");
        localStorage.setItem('storage', JSON.stringify(tempArray));
        setProducts(tempArray);
        setLoading(false);
       
       }
        
       */
     const getData = async () => {
         try{
          const response = await axios.get("https://sidereumapi2.herokuapp.com/saerge/getData");
          setLoading(false);
          let tempArray = [];
          tempArray = response.data.filter(elems => elems.type === "sarg");
          localStorage.setItem('storage', JSON.stringify(tempArray));
          setProducts(tempArray);

        }
        catch(error){
            console.log(error)
        }
      }
      getData();
  

      }, [updateUseeEffect] );

    
    
   const filterSarg = (sarg) => {
       let dataStore = JSON.parse(localStorage.getItem("storage"));
       let item = dataStore.filter(elem => elem.category === sarg);
       setProducts(item)
       if(sarg === "Alle Särge"){
        setProducts(dataStore)
       
       }
    }


    const filter = ev => {
         let titel = ev.currentTarget.getAttribute("ident");
         console.log(titel)
         filterSarg("designersarg");
         
         switch(titel){
             default:
                case "Alle Särge":
                    filterSarg(titel);
                break;
                 case "Kiefersärge":
                   filterSarg("kiefersarg");
                 break;
                 case "Pappelsärge":
                    filterSarg("pappelsarg");
                 break;
                 case "Eichensärge":
                    filterSarg("eichensarg");
                 break;
                 case "Designersärge":
                  filterSarg("designersarg");
                 break;
         }
     }

     const showProductModal = () => {
        setShowNewProductModal(true);
     }

     const hideProductModal = () => {
        setShowNewProductModal(false);
     }

     const hideUpdateProduct = () => {
        setshowUpdateProduct(false)
     }

     const updateSarg = (e) => {
         setItemIdent(e);
        setshowUpdateProduct(true)
     }

     const useEffectItemUpdate = () => {
        updateUseeEffect ++;
     }

     const deleteSarg = (ev) => {
        let identid = ev.currentTarget.getAttribute("id");

                  const removeSarg = async () => {
                    try{
                        const response = await axios.delete("https://sidereumapi2.herokuapp.com/saerge/delete",{data: {"_id":identid}});
                        console.log(response);
                        let deleteSarg = data.filter(sarg => sarg._id !== identid);
                        setProducts(deleteSarg) 
                    }   
                      catch(error){
                          console.log(error)
                      }
                  } 
                  removeSarg();
                  updateUseeEffect ++;
                 
    }

 
    return(
        <div className="productWrapper">
         {data  ?
         <>
          <div onClick={useEffectItemUpdate} id="updateUseEffectItem"></div>
          <h1 className="header">Särge</h1>
          <div className="navbar">
            <ConfigDropMenu
                titel="Kategorie"
                buttonClass="kategorieButton"
                icon_list={list}
                function={filter}
                icon={<FaThLarge style={{marginLeft: "5px"}} />}
            />
           
           <Button onClick={showProductModal} className="kategorieButton">
               <p className="iconDesc">Sarg hinzufügen</p>
               <FaPlusCircle className="iconAddProduct" />
           </Button>
         
         </div>

         <ModalBoxNewProduct 
                showNewProductModal={showNewProductModal}
                hideNewProductModal={hideProductModal}
          />

          <ModalBoxUpdateProduct 
             showUpdateProduct={showUpdateProduct}
            hideUpdateProduct={hideUpdateProduct}
            productIdent={itemIdent}
        />
        
           <Table className="table" striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{textAlign: "center"}}>#</th>
                            <th style={{textAlign: "center"}}>Bild</th>
                            <th style={{textAlign: "center"}}>Art-Nr</th>
                            <th style={{textAlign: "center"}}>Titel</th>
                            <th style={{textAlign: "center"}}>Kategorie</th>
                            <th style={{textAlign: "center"}}>Preis</th>
                            <th style={{textAlign: "center"}}>Bearbeiten</th>
                        </tr>
                    </thead>
                    <tbody>
                     {data.map((data, index) => {
                         return(
                            <tr key={index}>
                                 <td className="tdData">{index +1}</td>
                                 <td className="tdDataImage"><img src={data.img} className="tdImage" alt={data.titel}/></td>
                                 <td className="tdData">{data.art_nr}</td>
                                <td className="tdData">{data.titel}</td>
                                <td className="tdData">{data.category}</td>
                                <td className="tdData">{data.price}</td>
                                <td identid={index} className="tdData">
                                  <FaTrashAlt onClick={deleteSarg} id={data._id} className="configIcon" />
                                  <FaPencilAlt onClick={e => updateSarg(data)}  className="configIcon" />
                                </td>
                        </tr>
                         )
                     })}
                        
                    </tbody>
            </Table>
            </>
            :

            <FadeLoader
                css={override}
                sizeUnit={"px"}
                size={300}
                color={'#1E9CDC'}
                loading={loading}
             />
            
          }
        </div>
    )
}

export default Saerge;
