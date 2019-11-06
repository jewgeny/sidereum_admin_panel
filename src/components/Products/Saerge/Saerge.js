import React from "react";
import { Table } from 'react-bootstrap';
import "../../styles/products.css";
import sarg from "../../images/products/sarg.jpg";
import { FadeLoader} from 'react-spinners';



const Saerge = (props) => {
    const override = `
    display: block;
    margin: 25px auto;
    border-color: #1E9CDC;
   `;
    return(
        <div className="productWrapper">
          <h1 className="header">Särge</h1>
          {props.data ?
           <Table className="table" striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{textAlign: "center"}}>#</th>
                            <th style={{textAlign: "center"}}>Bild</th>
                            <th style={{textAlign: "center"}}>Titel</th>
                            <th style={{textAlign: "center"}}>Art-Nr</th>
                            <th style={{textAlign: "center"}}>Preis</th>
                        </tr>
                    </thead>
                    <tbody>
                     {props.data.data.map((data, index) => {
                         return(
                            <tr key={index}>
                                 <td className="tdData">{index +1}</td>
                                 <td className="tdDataImage"><img src={sarg} className="tdImage" alt={data.titel}/></td>
                                <td className="tdData">{data.titel}</td>
                                <td className="tdData">{data._id}</td>
                                <td className="tdData">{data.price}</td>
                        </tr>
                         )
                     })}
                        
                    </tbody>
            </Table>
            :
            <FadeLoader
                css={override}
                sizeUnit={"px"}
                size={300}
                color={'#1E9CDC'}
                loading={props.loading}
             />
          }
        </div>
    )
}

export default Saerge;
