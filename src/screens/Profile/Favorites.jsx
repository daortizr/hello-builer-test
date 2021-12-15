import { gql, useQuery } from "@apollo/client";
// import { gql, useQuery } from "apollo-boost";

const userName = localStorage.getItem("gitHubUserName");

const GET_REPOSITORIES = gql`
query {
  user(login:"${userName}") {
      pinnedItems(first: 5, types: [REPOSITORY, GIST]) {
          totalCount
          edges {
              node {
                  ... on Repository {
                  name
                  }
              }
          }
      }
  }
}`;

  const FavoritesData = () => {
    const { loading, error, data } =  useQuery(GET_REPOSITORIES);
  
      if (loading) {
          return <div>Loading...</div>;
      }
      if (error) {
          console.error('Error', error);
          return <div>Error!</div>;
      }
      console.log('favorites', data)
      return (
        <div>
          <h2>Favorites</h2>
          <ul>
            {data.user.pinnedItems.edges.lenght > 0 ? data.user.pinnedItems.edges.map((repo, index) => {
              return (
                <li><a key={`link_favorite_${index}`} href={repo.repo.url} target="_blank">
                  {repo.repo.name}
                </a></li>)
            }) : <li>There are no pinned repos</li>}
          </ul>
        </div>
      );
  }

  export default FavoritesData;
  