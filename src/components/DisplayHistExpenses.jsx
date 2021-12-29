import ExRows from "./ExRows";
import { useState } from 'react';
import axios from "axios";


const DisplayHistExpenses = (props) => {
    const[ret, setRet] = useState(false);
    const[isChecked, setIsChecked] = useState(false);
    let[keyId, setKeyId] = useState({dKey: []});
    const{data, setData} = props.data;
    let array2 = [];

    const{entryIds} = props;
    const {retrieveData} = props;

    const handleChange = (e) => {
        setIsChecked(prevChecked => !prevChecked);
        if(isChecked){
            console.log("ran")
            data.forEach((single) => {
                array2.push(single.e_id);
            })
           setKeyId({dKey: [...keyId.dKey, ...array2]})
        }else{
            keyId.dKey.splice(0,keyId.dKey.length);
            setKeyId({dKey: keyId.dKey})
            // array2.splice(0,array2.length);
            // keyId = {dkey:array2};
        }
        console.log("keyId onchange:", keyId.dKey);
    }

    const handleDeleteAll = () => {
        if(isChecked === true){
            let authToken = localStorage.getItem("auth_token");

            const authAxios = axios.create({
                headers:{
                    Authorization: authToken
                }
            });
            authAxios.delete('http://localhost:3000/entries/expenses/all')
            .then((res) => {
                if(res.status === 200){
                    setData("");
                }
            })
            .catch((err) => {
                if(err) return console.log(err);
            })

        }
    }

    
    const handleDelete = (e) => {
        let authToken = localStorage.getItem("auth_token");
        const payload ={
            data: {"keyId": keyId.dKey}
        };
        console.log("payload:", payload);
        const authAxios = axios.create({
            headers:{
                Authorization: authToken
            }
        });

         authAxios.delete('http://localhost:3000/entries/expenses/',payload)
            .then((res) => {
                if(res.status === 200){
                    retrieveData();
                    setData(props.data)
                }        
            })
            .catch((err) => {
                if(err) return console.log(err);
            })             
    }

    if(data.length > 0){  
        return(
            <>
                <div>
                    <input type="checkbox" checked={isChecked} onChange={handleChange} name="selectall" />
                    <label htmlFor="selectall"> select all</label>
                    <input type="button" value="delete all" onClick={handleDeleteAll}/>
                </div>
               { data.map((single) => {
                    return(
                        <div key={single.e_id} >
                            <ExRows key={single.e_id} isChecked={{isChecked, setIsChecked}} single={single}
                            keyId={{keyId, setKeyId}} entryIds={entryIds}/>
                        </div>
                    )
                })}
                <br></br><div><input type="button" value= 'delete' onClick={handleDelete} /></div>
            </>
        )
    }else{
        return(
            <>
                <h2>No data yet</h2>
            </>
        )
    }
}
export default DisplayHistExpenses