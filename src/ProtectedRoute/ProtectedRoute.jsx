import {
    Route,
    useNavigate
  } from "react-router-dom";

const PrivateRoute = (props) => {
    const history = useNavigate();
    const authLogin = (localStorage.getItem('authenticated') === undefined || localStorage.getItem('authenticated') === false) ? false : true;
    console.log("authLogin", authLogin);
  
    return authLogin ? (
      <Route {...props} />
    ) : history('/');
  };
  export default PrivateRoute;