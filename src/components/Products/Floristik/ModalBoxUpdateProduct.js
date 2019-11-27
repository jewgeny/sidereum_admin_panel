import React, {useState} from "react";
import { ButtonToolbar, Modal } from 'react-bootstrap';
import "../../styles/modalbox.css";
import Button from '@material-ui/core/Button';
import axios from "axios"; 
import "../../styles/inputfields.css";
import Form from "react-jsonschema-form";


const ModalBoxUpdateProduct = (props) => {
  let [showSuccessMsg, setSuccessMsg] = useState(false);
  let artNr = "";
  let titelProduct = "";
  let priceProduct = "";
  let imgProduct = "";
  let categoryProduct = "";


  if(props.productIdent){
    artNr = props.productIdent.art_nr;
    titelProduct = props.productIdent.titel;
    priceProduct = props.productIdent.price.toString();
    imgProduct = props.productIdent.img;
    categoryProduct = props.productIdent.category;
  }

 

  const submitForm = (ev) => {
    let idImgData = document.getElementById("idImg");
   let postData = async () => {
        
        let params = {
          titel: titelProduct,
          price: priceProduct,
          category: categoryProduct,
          art_nr:  artNr,
          img: imgProduct,
          type: "floristik"
        }
      
        try{
          let res = axios.put(`https://sidereumapi2.herokuapp.com/saerge/update/${props.productIdent._id}`, params);
          idImgData.setAttribute('src', "");
          document.getElementById("updateUseEffectItem").click();
          setSuccessMsg(true);
          setTimeout(() => {
            setSuccessMsg(false);
          }, 2000);
        }
        catch(error){
            console.log(error)
            setSuccessMsg(false)
        }
       
    }
    postData();

  
  }

let schema = {
  "type": "object",
  "properties": {
      "art_nr": {type: "string", title: "Art-Nr", default: artNr},
      "titel": {type: "string", title: "Titel", default: titelProduct},
      "price": {type: "string", title: "Preis", default: priceProduct},
      "category": { type: "string", title: "Kategorie", enum: ["gesteck", "us", "kranz", "sarg", "tisch"], default: categoryProduct, enumNames: ["Gestecke", "Urnenschmuck", "Kränze", "Sargschmuck", "Tischdeko"]},
      "file": {
          "type": "string",
          "format": "data-url",
          "title": "Bild vom Computer auswählen"
      }
     
  }
}

const onchangeData = e => {
  console.log("formdata",e.formData.art_nr);
   artNr = e.formData.art_nr;
   titelProduct = e.formData.titel;
   imgProduct = e.formData.file;
   priceProduct = e.formData.price;   
   categoryProduct = e.formData.category; 

   if(imgProduct){
    let idImg = document.getElementById("idImg");
     idImg.setAttribute('src', e.formData.file);
   }
}

    return (
      <ButtonToolbar>
        <Modal
         className="modalBox"
          size="lg"
          show={props.showUpdateProduct}
          onHide={props.hideUpdateProduct}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
             Floristik ändern
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="widthBody">
        
          <Form  schema={schema}
                 onSubmit={submitForm}
                 onChange={e => onchangeData(e)}
                 
          ><Button className="buttonConfig buttonNewProduct my-1" type="submit">Senden</Button></Form>
           <img id="idImg"  src="" />
           {showSuccessMsg &&
                        <div className="alert alert-success mt-3" role="alert">
                           Die Floristik wurde erfolgreich geändert
                        </div>
                       }
         
            </Modal.Body>
        </Modal>
      </ButtonToolbar>
    );
  }

  export default ModalBoxUpdateProduct;
  