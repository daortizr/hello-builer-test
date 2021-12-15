// import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup, GithubAuthProvider } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const history = useNavigate();
    const auth = getAuth();
    const provider = new GithubAuthProvider();
    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;

            localStorage.setItem('gitHubUserName', user.reloadUserInfo.screenName)
            localStorage.setItem('userToken', token)
            localStorage.setItem('authenticated', true)
            history('/profile');
        }
        catch (error) {
            console.log('error', error)
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GithubAuthProvider.credentialFromError(error);
        }
    }
    return (
        <div>
            <h1>Login with github</h1>
            <button onClick={() => handleLogin()}>Login with Github</button>
            {/* <button>Login with Github</button> */}
        </div>
    );
}

export default Login;