import axios from "axios";
import { useState } from "react";
import Displayexpenses from "../../components/Displayexpenses";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import Exit from "../../components/Exit";
import { baseUrl } from "../../components/util/url";

const Expenses = () => {
    // declaring state
    const[display, setDisplay] = useState(false);
    const[expenseData, setExpenseData] = useState("");
    console.log("expenseData", expenseData);
    const[details, setDetails] = useState({
        expenseType: '',
        amount: '',
        date: ''
    });
    //event handlers
    const handleChangeDetails = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setDetails({...details, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let received;
        let authToken = localStorage.getItem("auth_token");
        const {expenseType, amount, date} = details;

        const payload ={
            'expenseType': expenseType,
            'amount': amount,
            'date': date
        }

        //adding token to an instance of axios
        const authAxios = axios.create({
            headers:{
                Authorization: authToken
            }
        });
        authAxios.post(`${baseUrl}/entries/expenses`,payload)
        .then((res) => {
            if(res.data[0] === undefined){
                received = res.data;
            }else{received = res.data[0]}
            setExpenseData(received);
            setDisplay(true);
        })
        .catch((err) => {
            console.log(err)
        })

    }

    return(
        <>
            <Header />
            <Exit />
            <div style={{display: "inline-block"}}>
                <form onSubmit={handleSubmit}>
                    Expense type:<br></br>   
                    <input
                        name='expenseType'
                        value={details.expenseType}
                        onChange={handleChangeDetails}
                        required={true}
                    /><br></br>

                    Amount(₦):<br></br>   
                    <input
                        type='number'
                        name='amount'
                        value={details.amount}
                        onChange={handleChangeDetails}
                        required={true}
                    /><br></br>
                    
                    Date:<br></br>
                    <input
                        type='date'
                        name='date'
                        value={details.date}
                        onChange={handleChangeDetails}
                        required={true}
                    />
                    <input style={{display: "block", marginTop: '30px'}} type="submit" value="Proceed"/>
                </form>
            </div>
            {display && <div style={{display: "inline-block", marginLeft: 900}}>
                <Displayexpenses expenseData={expenseData} />
            </div>}

            <li style={{listStyle: 'none', marginTop: 50}}>  
                <Link to="/history/expenses" 
                style={{textDecoration: 'none'}}>
                    transaction history
                </Link>                   
            </li>
        </>
    )
}

export default Expenses;