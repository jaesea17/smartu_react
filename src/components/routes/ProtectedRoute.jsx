import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ auth, component: Component, ...rest}) => {
    return( <Route {...rest} 
                render={
                    (props) => {
                        return (
                                auth ? ( <Component {...props}/>) 
                                : ( <Redirect to={{pathname: '/signin', 
                                    state: {from: props.location}}} /> )                            
                            )
                    }
                }
            
            /> )
};
export default ProtectedRoute;