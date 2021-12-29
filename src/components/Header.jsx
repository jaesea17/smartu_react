import { useHistory } from "react-router";

const Header = () =>{
    let history = useHistory();
    return(
        <div style={
                {
                    textAlign: "center",
                    color: "white",
                    borderRadius: 5,
                    margin: 20,
                    cursor: "pointer"
                }
            }
            
            onClick={ () => {history.push("/")}}

        >
            <h1> smartU </h1>
        </div>
    )    
};
export default Header