import { Link } from "react-router-dom";

const Activities = () => {
    return(
        <div className="nav2">
            <ul>
                <li className="button">
                    <Link to="/expenses">Expenses</Link>
                </li>
            </ul>
        </div>
    )
};
export default Activities