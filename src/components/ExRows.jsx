import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "./util/url";

const ExRows = (props) => {
    //received from parent
    let receive = props.single;
    let receivedCheck = props.isChecked.isChecked;
    const[expenseType, setExpenseType] = useState(receive.expense_type)
    const[amount, setAmount] = useState(receive.amount);
    const[date, setDate] = useState(receive.date);
    const{keyId,setKeyId} = props.keyId;
    const{childCheck, setChildCheck} = props.childCheck;

    
    const[unEditable, setUnEditable] = useState(true);
    const[isChecked, setIsChecked] = useState(false);
    
    const handleEditable = () => {
        setUnEditable(prevUnEditable => !prevUnEditable);
    }

    const submitEdit = (e) => {
        e.preventDefault();
        if(unEditable === true) return;
        let authToken = localStorage.getItem("auth_token");
        const payload = {
            "expenseType": expenseType,
            "amount": amount,
            "date": date
        }
        
        const authAxios = axios.create({
            headers:{
                Authorization: authToken
            }
        });
        authAxios.patch(`${baseUrl}/entries/expenses/${receive.e_id}`,payload)
        .then((res) => {
            if(res.status === 200){
                
            }        
        })
        .catch((err) => {
            if(err) return console.log(err);
        })        
        
        setUnEditable(prevUnEditable => prevUnEditable = true);
    }
    
    const handleExpenseType = (e) => {
        setExpenseType(e.target.value);
    }

    const handleAmount = (e) => {
        setAmount(e.target.value);
    }

    const handleDate = (e) => {
        setDate(e.target.value);
    }

    const handleChange = (e) => {
        setIsChecked(!isChecked);
        setChildCheck(!childCheck);
        if(isChecked === false){
            setKeyId({ dKey: [...keyId.dKey, e.target.value] });     
        }else{
            const index = keyId.dKey.indexOf(e.target.value);
            keyId.dKey.splice(index, 1)
            setKeyId({ dKey: keyId.dKey })
        }

    }
    
    
    //setting the checked state of child to that of parent state
    useEffect( () => {
        setIsChecked(receivedCheck)
    }, [receivedCheck])


    return(
        <>  
            <form onSubmit={submitEdit}>
                <input type="checkbox" checked={isChecked} onChange={handleChange}
                value={receive.e_id}/>
                <input value={expenseType} readOnly={unEditable}
                onChange={handleExpenseType} onDoubleClick={handleEditable}/>
                <input value={amount} readOnly={unEditable}
                onChange={handleAmount} onDoubleClick={handleEditable}/>
                <input value={date} readOnly={unEditable}
                onChange={handleDate} onDoubleClick={handleEditable}/>
                <input type="submit" value="edit" style={{marginLeft: 2}}/> 
            </form>
        </>
    )
}
export default ExRows;