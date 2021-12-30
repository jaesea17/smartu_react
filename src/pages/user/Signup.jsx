import { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Header from "../../components/Header";
import { baseUrl } from "../../components/util/url";

const Signup = () => {
    const [inputs, setInputs] = useState({firstName: "", lastName: "",email: "",password: ""});
    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const{firstName, lastName, email, password} = inputs;
        const payload = {
            "firstName": firstName, "lastName": lastName,
            "email": email, "password": password        
        }
        axios.post(`${baseUrl}/user/signUp`, payload)
        .then((res)=>{
            if(res.status === 200){
                history.push("/signin");
            } 
        }).catch((err)=>{
            console.log(err);
        })
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({...inputs, [name]: value})
    }

    return(
        <>
            <Header />
            <div className="sign_up_in">
                <h3>do it the smart way!</h3>
                <form onSubmit={handleSubmit}>
                    <label>First Name:
                        <input
                        type="text"
                        name="firstName"
                        value={inputs.firstName || ""}                    
                        onChange={handleChange}
                        />
                    </label>
                    <label>Last Name:
                        <input
                        type="text" 
                        name="lastName"
                        value={inputs.lastName || ""}
                        onChange={handleChange}
                        />
                    </label>
                    <label>Email:
                        <input
                        type="email" 
                        name="email"
                        value={inputs.email || ""}
                        onChange={handleChange}
                        />
                    </label>
                    <label>Password:
                        <input
                        type="password" 
                        name="password"
                        value={inputs.password || ""}
                        onChange={handleChange}
                        />
                    </label>
                    <li style={{listStyle: "none"}}>(Password must be atleast 6 characters long)</li>

                    <p>By clicking Sign-up, you agree to smartU's User Agreement, Private Policy</p>
                    <input type="submit" value="signup"/>
                </form>
                <p>Already on smartU?<Link to="/signin">signin</Link></p>
            </div>
        </>
    )
};
export default Signup