import React, { useState } from "react";
import { ButtonToolbar, Modal } from 'react-bootstrap';
import "../../styles/modalbox.css";
import Button from '@material-ui/core/Button';
import axios from "axios";
import "../../styles/inputfields.css";
import Form from "react-jsonschema-form";
//import image2base64 from "image-to-base64";


const ImageUploader = (props) => {
    let [art_nr, setArtNr] = useState("");
    let [titel, setTitel] = useState("");
    let [price, setPrice] = useState("");
    let [category, setCategory] = useState("");
    let [showSuccessMsg, setSuccessMsg] = useState(false);
    let [file, setFile] = useState(null);

    const changeValue = (ev) => {

        let ident = ev.target.getAttribute("ident");

        switch (ident) {
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
            try {
                let res = axios.post("https://sidereumapi2.herokuapp.com/saerge/create", params);
                document.getElementById("updateUseEffectItem").click();
                setSuccessMsg(true);
                setTimeout(() => {
                    setSuccessMsg(false);
                }, 2000);
            }
            catch (error) {
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

    let schema = {
        "title": "Files",
        "type": "object",
        "properties": {
            "file": {
                "type": "string",
                "format": "data-url",
                "title": "Single file"
            },
            "files": {
                "type": "array",
                "title": "Multiple files",
                "items": {
                    "type": "string",
                    "format": "data-url"
                }
            },
            "filesAccept": {
                "type": "string",
                "format": "data-url",
                "title": "Single File with Accept attribute"
            }
        }
    }



    const _onchange = (e) => {
        console.log("_onchange")
        if (e) {
            console.log("e", e.formData.file)
            let data = e.formData.file
            let params = {
                titel: titel,
                price: price,
                category: category,
                art_nr: art_nr,
                img: data
            }

            let res = axios.post("https://sidereumapi2.herokuapp.com/saerge/create", params);
            console.log("res", res);
        } else {
            console.log("image war leer!")
        }

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

                    <Form
                        onChange={e => _onchange(e)}
                        schema={schema}
                    />

                </Modal.Body>
            </Modal>
        </ButtonToolbar>
    );
}

export default ImageUploader;
