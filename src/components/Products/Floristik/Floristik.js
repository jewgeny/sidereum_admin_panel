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
    {icon: <FaAngleRight/>, titel: "Alle Blumen"},
    {icon: <FaAngleRight/>, titel: "Gestecke"},
    {icon:  <FaAngleRight/>, titel: "Urnenschmuck"},
    {icon:  <FaAngleRight/>, titel: "Kränze"},
    {icon:  <FaAngleRight/>, titel: "Sargschmuck"},
    {icon:  <FaAngleRight/>, titel: "Tischdeko"},
 ]

 const override = `
 display: block;
 margin: 25px auto;
 border-color: #1E9CDC;
`;

let updateUseeEffect = 0;


const Floristik = (props) => {
    let dataStore = JSON.parse(localStorage.getItem("storagefloristik"));
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
          tempArray = response.data.filter(elems => elems.type === "floristik");
          localStorage.setItem('storagefloristik', JSON.stringify(tempArray));
          setProducts(tempArray);
        }
        catch(error){
            console.log(error)
        }
      }
     
      getData();

      }, [updateUseeEffect]);

    
    
   const filterFloristik = (blume) => {
       let dataStore = JSON.parse(localStorage.getItem("storagefloristik"));
       let item = dataStore.filter(elem => elem.category === blume);
       setProducts(item)
       if(blume === "Alle Blumen"){
        setProducts(dataStore)
       }
    }


    const filter = ev => {
         let titel = ev.currentTarget.getAttribute("ident");

         switch(titel){
             default:
                case "Alle Blumen":
                    filterFloristik(titel);
                break;
                 case "Gestecke":
                    filterFloristik("gesteck");
                 break;
                 case "Urnenschmuck":
                    filterFloristik("us");
                 break;
                 case "Kränze":
                    filterFloristik("kranz");
                 break;
                 case "Sargschmuck":
                    filterFloristik("sarg");
                 break;
                 case "Tischdeko":
                    filterFloristik("tisch");
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

     const updateFloristik = (e) => {
         setItemIdent(e);
        setshowUpdateProduct(true)
     }

     const useEffectItemUpdate = () => {
        updateUseeEffect ++;
     }

     const deleteBlume = (ev) => {
        let identid = ev.currentTarget.getAttribute("id");

                  const removeBlume = async () => {
                    try{
                        const response = await axios.delete("https://sidereumapi2.herokuapp.com/saerge/delete",{data: {"_id":identid}});
                        let deleteFloristik = items.filter(blume => blume._id !== identid);
                        setProducts(deleteFloristik)             
                    }   
                      catch(error){
                          console.log(error)
                      }
                  } 
                  removeBlume();
                  updateUseeEffect ++;
                 
    }

 
    return(
        <div className="productWrapper">
         {items ?
         <>
          <div onClick={useEffectItemUpdate} id="updateUseEffectItem"></div>
          <h1 className="header">Floristik</h1>
          <div className="navbar">
            <ConfigDropMenu
                titel="Kategorie"
                buttonClass="kategorieButton"
                icon_list={list}
                function={filter}
                icon={<FaThLarge style={{marginLeft: "5px"}} />}
            />
           
           <Button onClick={showProductModal} className="kategorieButton">
               <p className="iconDesc">Floristik hinzufügen</p>
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
                                  <FaTrashAlt onClick={deleteBlume} id={data._id} className="configIcon" />
                                  <FaPencilAlt onClick={e => updateFloristik(data)}  className="configIcon" />
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

export default Floristik;
