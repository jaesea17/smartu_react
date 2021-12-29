import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TableAdOrEdit = (props) => {
    const [visible, setVisible] = useState(false);

    let infoS = [];
    if(props.adEdit !== ""){
        let {
            order_number, item, weight,f_country, f_address,
            f_city, f_state, t_country, t_address, t_city,
            t_state, status, location, customer_id, email       
        } = props.adEdit[0];

        let dinfo = [order_number, item, weight,f_country, f_address,
        f_city, f_state, t_country, t_address, t_city,
        t_state, status, location, customer_id, email ] 

        dinfo.forEach((header) => {
            infoS.push(header);
        })       
    };

    useEffect(() => {
        setVisible(true);
    },[props.adEdit])
    
    useEffect(() => {       
        setVisible(false);
    },[])

    return(
        <>
           {visible && <div>
                <table style={{marginBottom: "10px"}}>
                    <thead style={{ backgroundColor: "#8d8d8d"}}>
                        <tr>
                            {
                                props.tableHeading.map((heading)=>{
                                return(
                                    <th key={heading}>{heading}</th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: "#f3eded"}}>
                        <tr>
                            {infoS.map((single) => {
                                return(
                                    <td key={uuidv4()}>{single}</td>
                                )
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>}
        </>
    )
};
export default TableAdOrEdit