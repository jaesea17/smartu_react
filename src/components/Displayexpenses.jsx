const Displayexpenses = (props) => {
    let {amount, date} = props.expenseData;
    let expenseType = props.expenseData.expense_type;
    
    if(props.expenseData.amount === undefined){
        console.log("props:", props)
        return(
            <>
                 <h2>ENTRY DETAILS</h2>
                 <h3>  ENTRY ALREADY EXISTS </h3>
            </>
        )
    };
    if(amount.length > 0 ){
        return(
            <>
                <h2>ENTRY DETAILS</h2>
                <h3>  {date} </h3>
                <h3> ₦{amount} </h3>
                <h3> {expenseType} </h3>
            </>
        )
    }else{
        return(
            <><h3>no data yet</h3></>
        )
    }
  
}
export default Displayexpenses