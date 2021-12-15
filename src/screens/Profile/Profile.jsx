import RepoData from './RepoData';
import { useState } from 'react';
import FavoritesData from './Favorites';
import { getAuth, signOut } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';

const createApolloClient = (authToken) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://api.github.com/graphql',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }),
    cache: new InMemoryCache(),
  });
 };

const Profile = () => {
    const authToken = localStorage.getItem("userToken");
    const [client] = useState(createApolloClient(authToken));
    const authLogin = (localStorage.getItem('authenticated') === undefined || localStorage.getItem('authenticated') === false || localStorage.getItem('authenticated') === null) ? false : true;
    console.log('authLogin', authLogin, localStorage.getItem('authenticated'))
    const history = useNavigate();
    const auth = getAuth();
    const handleSignOut = () => {
        signOut(auth).then(() => {
            history('/');
            localStorage.clear()
            console.log('Sign-out successful.');
        }).catch((error) => {
            console.log('An error happened.');
        });
    }
    if (authLogin) {
        return (
            <ApolloProvider client={client}>
                <div>
                    <div>
                        <RepoData />
                    </div>
                    <div>
                        <FavoritesData />
                    </div>
                    <div>
                        <button key={'signout_button'} onClick={() => handleSignOut()}>Log out</button>
                    </div>
                </div>
            </ApolloProvider>
        );
    }
    else {
        return (
            <div>
                <h2>Unauthenticated</h2>
                <button onClick={() => history('/')}>Return to login</button>
            </div>
        );
    }
}


export default Profile;
