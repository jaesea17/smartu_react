import { Route, Switch } from "react-router-dom";
import Activities from "../../components/Activities.jsx";
import Header from "../../components/Header.jsx";
import Navbar from "../../components/Navbar.jsx";
import Main from "../../components/Main.jsx";
import Signin from "../user/Signin.jsx"; 
import Signup from "../user/Signup.jsx";
import Contact from "../contact/Contact.jsx";
import About from "../about/About.jsx";
import Error from "../Error.jsx";
import ProtectedRoute from "../../components/routes/ProtectedRoute.jsx";
import { useState, useEffect } from "react";
import { auth } from "../../components/util/auth.js";
import { UserContext } from "../../useContext.js";
import { Signout } from "../user/Signout.jsx";
import Expenses from "../title/Expenses.jsx";
import HistoryExpenses from "../history/HistoryExpenses.jsx";

const Home = () => {
    let [isAuth, setIsAuth] = useState(auth);
    useEffect(() => {
        auth()
        setIsAuth(auth)
    }, [isAuth]);

    return(

        <Switch>
            <Route exact path='/'>
                <div>
                    <Header />
                    <Navbar />
                    <Main />                
                    <Activities />
                </div>
            </Route>

            <Route path='/signin'> 
                <UserContext.Provider value={[isAuth, setIsAuth]}>
                    <Signin />
                </UserContext.Provider>
            </Route>

            <Route path='/signout'> 
                <UserContext.Provider value={[isAuth, setIsAuth]}>
                    <Signout />
                </UserContext.Provider>
            </Route>

            <Route path='/signup'>
                <Signup />
            </Route>

            <Route path='/contact'>
                <Contact />
            </Route>

            <Route path='/about'>
                <About />
            </Route>

            <Route path='/expenses'>
                <Expenses />
            </Route>

            {/* <Route path='/history/expenses'>
                <HistoryExpenses />
            </Route> */}

            <ProtectedRoute path='/history/expenses' auth={isAuth} component={HistoryExpenses}/> 
    

            <Route >
                <Error />
            </Route>


        </Switch>
    )
};
export default Home
