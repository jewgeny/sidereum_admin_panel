import React, {useState, useEffect} from "react";
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



const list = [
    {icon: <FaAngleRight/>, titel: "Alle Urnen"},
    {icon: <FaAngleRight/>, titel: "Seeurnen"},
    {icon:  <FaAngleRight/>, titel: "Biournen"},
    {icon:  <FaAngleRight/>, titel: "Airbrush Urnen"},
    {icon:  <FaAngleRight/>, titel: "Einfache Urnen"},
    {icon:  <FaAngleRight/>, titel: "Handgemalte Urnen"},
    {icon:  <FaAngleRight/>, titel: "Normale Urnen"},
 ]

 const override = `
 display: block;
 margin: 25px auto;
 border-color: #1E9CDC;
`;

let updateUseeEffect = 0;


const Urnen = (props) => {
    let dataStore = JSON.parse(localStorage.getItem("storageurne"));
    let [items, setProducts] = useState(dataStore || null);
    let [loading, setLoading] = useState(true);
    let [showNewProductModal, setShowNewProductModal] = useState(false);
    let [showUpdateProduct, setshowUpdateProduct] = useState(false);
    let [itemIdent, setItemIdent] = useState(null);


    useEffect(() => {
   
     const getData = async () => {
         try{
          const response = await axios.get("https://sidereumapi2.herokuapp.com/saerge/getData");
          setLoading(false);
          let tempArray = [];
          tempArray = response.data.filter(elems => elems.type === "urne");
          localStorage.setItem('storageurne', JSON.stringify(tempArray));
          setProducts(tempArray);
        
        }
        catch(error){
            console.log(error)
        }
      }
     
      getData();

      }, [updateUseeEffect]);

    
    
   const filterUrne = (urne) => {
       let dataStore = JSON.parse(localStorage.getItem("storageurne"));
       let item = dataStore.filter(elem => elem.category === urne);
       setProducts(item)
       if(urne === "Alle Urnen"){
        setProducts(dataStore)
       
       }
    }


    const filter = ev => {
         let titel = ev.currentTarget.getAttribute("ident");

         switch(titel){
             default:
                case "Alle Urnen":
                    filterUrne(titel);
                break;
                 case "Seeurnen":
                    filterUrne("see");
                 break;
                 case "Biournen":
                    filterUrne("bio");
                 break;
                 case "Airbrush Urnen":
                    filterUrne("airbrush");
                 break;
                 case "Einfache Urnen":
                    filterUrne("einfach");
                 break;
                 case "Handgemalte Urnen":
                    filterUrne("handgemalt");
                 break;
                 case "Normale Urnen":
                    filterUrne("normal");
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

     const deleteUrne = (ev) => {
        let identid = ev.currentTarget.getAttribute("id");

                  const removeUrne = async () => {
                    try{
                        const response = await axios.delete("https://sidereumapi2.herokuapp.com/saerge/delete",{data: {"_id":identid}});
                        let deleteUrne = items.filter(urne => urne._id !== identid);
                        setProducts(deleteUrne)
                        //setUpdateItem(!updateItem);
                        
                    }   
                      catch(error){
                          console.log(error)
                      }
                  } 
                  removeUrne();
                  updateUseeEffect ++;
                 
    }

 
    return(
        <div className="productWrapper">
         {items ?
         <>
          <div onClick={useEffectItemUpdate} id="updateUseEffectItem"></div>
          <h1 className="header">Urnen</h1>
          <div className="navbar">
            <ConfigDropMenu
                titel="Kategorie"
                buttonClass="kategorieButton"
                icon_list={list}
                function={filter}
                icon={<FaThLarge style={{marginLeft: "5px"}} />}
            />
           
           <Button onClick={showProductModal} className="kategorieButton">
               <p className="iconDesc">Urne hinzufügen</p>
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
                     {items.map((data, index) => {
                         return(
                            <tr key={index}>
                                 <td className="tdData">{index +1}</td>
                                 <td className="tdDataImage"><img src={data.img} className="tdImage" alt={data.titel}/></td>
                                 <td className="tdData">{data.art_nr}</td>
                                <td className="tdData">{data.titel}</td>
                                <td className="tdData">{data.category}</td>
                                <td className="tdData">{data.price}</td>
                                <td identid={index} className="tdData">
                                  <FaTrashAlt onClick={deleteUrne} id={data._id} className="configIcon" />
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

export default Urnen;
