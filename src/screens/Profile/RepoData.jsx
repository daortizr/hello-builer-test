import { gql, useQuery } from "@apollo/client";
// import { gql, useQuery } from "apollo-boost";

const userName = localStorage.getItem("gitHubUserName");

const GET_REPOSITORIES = gql`
{
    search(type: REPOSITORY, query: "user:daortizr", first: 10) {
      repos: edges {
        repo: node {
          ... on Repository {
            url,
            name,
            id
          }
        }
      }
    }
  }`;

  const RepoData = () => {
    const { loading, error, data } =  useQuery(GET_REPOSITORIES);
  
      if (loading) {
          return <div>Loading...</div>;
      }
      if (error) {
          console.error('Error', error);
          return <div>Error!</div>;
      }
      return (
          <div>
              <h2>Respositories List</h2>
              <ul>
                  {data.search.repos.map((repo, index) => {
                      return (
                          <li key={`list_repo_${index}`}><a key={`link_repo_${index}`} href={repo.repo.url} target="_blank">
                              {repo.repo.name}
                          </a></li>)
                  })}
              </ul>
          </div>
      );
  }

  export default RepoData;
  