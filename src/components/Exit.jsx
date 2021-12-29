import { Link } from "react-router-dom";

const Exit = () => {
    return(
        <div className="nav">
            <ul>
                <li>  
                    <Link to="/signout">Sign-out</Link>                   
                </li>
            </ul>
        </div>
    )
};
export default Exit