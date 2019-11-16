import React, {useState} from "react";
import { ButtonToolbar, Modal } from 'react-bootstrap';
import "../../styles/modalbox.css";
import Button from '@material-ui/core/Button';
import axios from "axios"; 
import "../../styles/inputfields.css";
//import image2base64 from "image-to-base64";


const ModalBoxNewProduct = (props) => {
  let [art_nr, setArtNr] = useState("");
  let [titel, setTitel] = useState("");
  let [price, setPrice] = useState("");
  let [category, setCategory] = useState("");
  let [showSuccessMsg, setSuccessMsg] = useState(false);
  let [file, setFile] = useState(null);

  const changeValue = (ev) => {
   
    let ident = ev.target.getAttribute("ident");

    switch(ident){
      case "artnr":
          setArtNr(ev.target.value); 
        break;
      case "titel":
          setTitel(ev.target.value); 
        break;
      case "category":
          setCategory(ev.target.value); 
      break;
      case "price":
          setPrice(ev.target.value); 
      break;
       default:
         return ident;
    }
    
   
  }
  const submitForm = (ev) => {
    ev.preventDefault();
    let postData = async () => {
        
      const data = new FormData() 
      data.append('file', file);
      
        let params = {
          titel: titel,
          price: price,
          category: category,
          art_nr: art_nr,
          //img: data
        }
        try{
          let res = axios.post("https://sidereumapi2.herokuapp.com/saerge/create", params);
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



  const getImageFile = (ev) => {
     console.log(ev)
     setFile(file = ev.target.files[0]);
    console.log(file)
    
  }

    return (
      <ButtonToolbar>
        <Modal
         className="modalBox"
          size="lg"
          show={props.showNewProductModal}
          onHide={props.hideNewProductModal}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Neuen Sarg hinzufügen
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="widthBody">
          <form  onClick={props.updateData} className="mx-auto" onSubmit={submitForm}>
                        <input className="form-control my-2 kontaktInput" ident="artnr" value={art_nr} onChange={changeValue}  type="text" placeholder="Art-Nr"  />
                        <input className="form-control my-2 kontaktInput" ident="titel" value={titel} onChange={changeValue}  type="text" placeholder="Titel"  />
                            <div className="input-group my-2">
                                <select ident="category" value={category} onChange={changeValue} className="custom-select">
                                    <option>Auswahl</option>
                                    <option value="kiefersarg">Kiefersarg</option>
                                    <option value="pappelsarg">Pappelsarg</option>
                                    <option value="designersarg">Designersarg</option>
                                    <option value="eichensarg">Eichensarg</option>
                                </select>
                                <div className="input-group-append">
                                <label className="input-group-text">Kategorie</label>
                                </div>
                            </div>
                            <input className="form-control my-2 kontaktInput" ident="price" value={price} onChange={changeValue}  type="text" placeholder="Preis"  />
                           
                           <div className="input_buttun_wrapper">
                               <input onChange={getImageFile} type="file" className="my-2" />
                               <Button type="submit" className="buttonConfig buttonNewProduct my-3">Bestätigen</Button>
                           </div>
                           

                      {showSuccessMsg &&
                        <div className="alert alert-success mt-3" role="alert">
                           Der neue Sarg wurde erfolgreich in die Liste hinzugefügt
                        </div>
                       }
                       
                    </form>
            </Modal.Body>
        </Modal>
      </ButtonToolbar>
    );
  }

  export default ModalBoxNewProduct;
  