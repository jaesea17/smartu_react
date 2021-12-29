import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import DisplayHistExpenses from "../../components/DisplayHistExpenses";


const HistoryExpenses = () => {

    //declaring states
    const[data, setData] = useState("");
    const[entryIds, setEntryIds] = useState([])

    const retrieveData = () => {
        let authToken = localStorage.getItem("auth_token");
        //adding token to an instance of axios
        const authAxios = axios.create({
            headers:{
                Authorization: authToken
            }
        });
        authAxios.get('http://localhost:3000/entries/expenses')
        .then((res) => {
            let received = res.data;
            setData(received);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    //setting using to run function retrieveData on every page render
    useEffect(() => {
        retrieveData();
    }, [])


    return(
        <>
            <DisplayHistExpenses data={{data, setData}} entryIds={entryIds}
            retrieveData={retrieveData}/>
        </>
    )
}
export default HistoryExpenses