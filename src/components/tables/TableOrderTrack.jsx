import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const TableOrderTrack = (props) => {
    const [visibleT, setVisibleT] = useState(false);
    const [visibleH, setVisibleH] = useState(false);

    let history = useHistory();
    let tHistory = [];
    let infoS = [];
    let infoH = [];
    if(props.tableV !== ""){
        let {
            order_number, item, weight,f_country, f_address,
            f_city, f_state, t_country, t_address, t_city,
            t_state, status, location, customer_id, email       
        } = props.tableV[0];

        let dinfo = [order_number, item, weight,f_country, f_address,
        f_city, f_state, t_country, t_address, t_city,
        t_state, status, location, customer_id, email ] 

        dinfo.forEach((header) => {
            infoS.push(header);
        })       
    };

    if(props.trackHistory !== ""){ 
        tHistory = props.trackHistory;   
        for(let i = 0; i < tHistory.length; i++){
            let preInfo = [];
            let {
                order_number, item, weight,f_country, f_address,
                f_city, f_state, t_country, t_address, t_city,
                t_state, status, location, customer_id, email       
            } = props.trackHistory[i];
    
            let dinfo = [order_number, item, weight,f_country, f_address,
                f_city, f_state, t_country, t_address, t_city,
                t_state, status, location, customer_id, email ] 
    
            dinfo.forEach((header) => {
                preInfo.push(header);
            });

            infoH.push(preInfo);      
        }
        
    };

    //creating buttons to navigate
    const toEdit = () => {
        if(props.tableV[0].status !== null && props.tableV[0].status.toLowerCase() === 'delivered') return alert('Parcel has already been delivered');
        history.push("/orders/orders_edit_page")
    };
    const toDelete = () => {
        if(props.tableV[0].status !== null && props.tableV[0].status.toLowerCase() === 'delivered') return alert('Parcel has already been delivered');
        history.push("/orders/orders_delete_page")
    };

    //setting effects to hide and unhide table
    useEffect(() => {
        setVisibleH(false);
        setVisibleT(true);
    },[props.tableV]);

    useEffect(() => {
        setVisibleH(true);
        setVisibleT(false);
    },[props.trackHistory]);

    useEffect(() => {
        setVisibleH(false);
        setVisibleT(false);
    },[]);

    return(
        <> 
            { visibleH && <div>
                <table>
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
                        {infoH.map((single) => {
                            return(
                                <tr key={uuidv4()}>
                                    {single.map((item) => {
                                        return(
                                            <td key={uuidv4()}>{item}</td>
                                        )
                                    })}
                                </tr>
                            )
                        })}              
                    </tbody>
                </table>
            </div>}
            
            {visibleT && <div>
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
                <button onClick={toEdit}>
                    Edit
                </button>
                <button onClick={toDelete}>
                    Delete
                </button>
            </div>}
        </>
    )
};
export default TableOrderTrack