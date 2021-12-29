import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <div className="nav">
            <ul>
                <li>  
                    <Link to="/signin">Signin</Link>                   
                </li>
                <li>  
                    <Link to="/signup">Signup</Link>
                </li>
                <li>  
                <li>  
                    <Link to="/about">About</Link>
                </li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
        </div>
    )
};
export default Navbar