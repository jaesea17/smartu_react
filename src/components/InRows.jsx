import { useEffect, useState } from "react";

const InRows = (props) => {
    let receive = props.single;
    let receivedCheck = props.isChecked;

    const[amount, setAmount] = useState(receive.amount);
    const[date, setDate] = useState(receive.date);
    const[isChecked, setIsChecked] = useState(receivedCheck);
    const{setKeyId} = props;
    const{entryIds} = props;
    let all = [];
    let another = [];
    
    const handleChange = (e) => {
        all.push(e.target.value);
        setKeyId();
        setIsChecked(!isChecked);
        console.log("all", all);
        another.push(all);
        console.log("another", another);
    }
    
    const handleAmount = (e) => {
        setAmount(e.target.value);
    }

    const handleDate = (e) => {
        setDate(e.target.value);
    }
    //setting the state to the parent state
    useEffect( () => {
        setIsChecked(receivedCheck)
    },[receivedCheck])

    return(
        <>
            <input type="checkbox" name="data" checked={isChecked} value= {receive.in_id} onChange={handleChange}/>
            <label for="data" key={receive.in_id}>
                <input value={amount} readOnly={true} />
                <input value={date} readOnly={true}/>
            </label>
        </>
            
    )
}
export default InRows;