import React, {useState, useEffect} from "react";
import { Table } from 'react-bootstrap';
import "../../styles/products.css";
import sarg from "../../images/products/sarg.jpg";
import { FadeLoader} from 'react-spinners';
import ConfigDropMenu from "../ConfigDropMenu";
import { FaTrashAlt, FaPencilAlt, FaPlusCircle } from "react-icons/fa";
import "../../styles/navbar.css";
import { FaAngleRight, FaThLarge} from "react-icons/fa";
import axios from "axios"; 
import Button from '@material-ui/core/Button';
import  ModalBoxNewProduct from "./ModalBoxNewProduct";

const icon_list = [
   {icon: <FaTrashAlt />, titel: "Löschen"},
   {icon: <FaPencilAlt />, titel: "Ändern"},
]

const list = [
    {icon: <FaAngleRight/>, titel: "Alle Särge"},
    {icon: <FaAngleRight/>, titel: "Kiefersarg"},
    {icon:  <FaAngleRight/>, titel: "Pappelsarg"},
    {icon:  <FaAngleRight/>, titel: "Eichensarg"},
    {icon:  <FaAngleRight/>, titel: "Designersarg"},
 ]

 const override = `
 display: block;
 margin: 25px auto;
 border-color: #1E9CDC;
`;




const Saerge = (props) => {
    let [items, setProducts] = useState(null);
    let [loading, setLoading] = useState(true);
    let [showNewProductModal, setShowNewProductModal] = useState(false);

    useEffect(() => {
        //setProducts(props.data)

     const getData = async () => {
         try{
          const response = await axios.get("https://sidereumapi2.herokuapp.com/saerge/getData");
          console.log(response)
          setProducts(response.data)
          setLoading(false)
          //setLoading(false)
        }
        catch(error){
            console.log(error)
        }
      }
      
      getData();


      }, []);

    //let products = props.data;

   const filterSarg = (sarg) => {
       console.log("filter me")
       let item = props.data.filter(elem => elem.category === sarg);
       console.log( item);
       setProducts(item)
       if(sarg === "Alle Särge"){
        setProducts(props.data)
       }
    }


    const filter = ev => {
         let titel = ev.currentTarget.getAttribute("ident");
         filterSarg("designersarg");
         
         switch(titel){
             default:
                case "Alle Särge":
                    filterSarg(titel);
                break;
                 case "Kiefersarg":
                   filterSarg("kiefersarg");
                 break;
                 case "Pappelsarg":
                    filterSarg("pappelsarg");
                 break;
                 case "Eichensarg":
                    filterSarg("eichensarg");
                 break;
                 case "Designersarg":
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

    
   
    return(
        <div className="productWrapper">
         {items ?
         <>
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
                                 <td className="tdDataImage"><img src={sarg} className="tdImage" alt={data.titel}/></td>
                                 <td className="tdData">{data.art_nr}</td>
                                <td className="tdData">{data.titel}</td>
                                <td className="tdData">{data.category}</td>
                                <td className="tdData">{data.price}</td>
                                <td className="tdData"><ConfigDropMenu
                                    icon_list={icon_list}
                                    buttonClass="buttonConfig" 
                                    titel="Auswählen"
                                    />
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
