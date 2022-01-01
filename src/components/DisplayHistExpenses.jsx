import ExRows from "./ExRows";
import { useEffect, useState } from 'react';
import axios from "axios";
import { baseUrl } from "./util/url";

const DisplayHistExpenses = (props) => {
    const[childCheck, setChildCheck] = useState(false);
    const[isChecked, setIsChecked] = useState(false);
    let[keyId, setKeyId] = useState({dKey: []});
    const{data, setData} = props.data;
    let array2 = [];
    const {retrieveData} = props;
    
    const handleChange = (e) => {
        setIsChecked(prevChecked => !prevChecked);
    }

    const handleDeleteAll = () => {
        if(isChecked === true){
            let authToken = localStorage.getItem("auth_token");

            const authAxios = axios.create({
                headers:{
                    Authorization: authToken
                }
            });
            authAxios.delete(`${baseUrl}/entries/expenses/all`)
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
        //creating an instance of axios that carries the Authorization in headers
        const authAxios = axios.create({
            headers:{
                Authorization: authToken
            }
        });

         authAxios.delete(`${baseUrl}/entries/expenses/`,payload)
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


    useEffect(() => {
        console.log('keyid length', keyId.dKey.length);
        console.log('data length', data.length);
        if(keyId.dKey.length === data.length){
            console.log('entered true');
            setIsChecked(true);
            keyId.dKey.splice(0, keyId.dKey.length);
        }else{console.log('entered false');
            setIsChecked(false);}
    },[childCheck])


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
                            keyId={{keyId, setKeyId}}  childCheck={{childCheck, setChildCheck}}/>
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