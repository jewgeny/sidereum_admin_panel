import React from "react";
import "../styles/selection.css";
import sarg from "../images/products/sarg.jpg";
import urne from "../images/products/urne.png";
import floristik from "../images/products/floristik.jpg";
import { Card, Button } from 'react-bootstrap';
import {NavLink, Route} from "react-router-dom";


const data_products = [
    {img: sarg, titel: "Särge", path: "/saerge"},
    {img: urne, titel: "Urnen", path: "/urnen"},
    {img: floristik, titel: "Floristik", path: "floristik"},
]

const Selection = () => {
    return(
        <div className="selectionWrapper">
             <h1 className="header">Auswahl</h1>
             <div className="productsWrapper">
               {data_products.map((product, index) => {
                    return(
                        <Card className="cardBox" key={index}>
                            <Card.Img alt={product.titel} variant="top" src={product.img} className="cardImage" />
                            <Card.Body>
                                <Card.Title className="cardTitel">{product.titel}</Card.Title>
                                <NavLink to={product.path}  className="link">
                                    <Button  className="cardButton">Auswählen</Button>
                                </NavLink>
                            </Card.Body>
                      </Card>
            
                    )
               })}
             </div>
        </div>
    )
}

export default Selection;