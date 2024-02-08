import { useEffect, useState } from 'react'
import './App.css'
import axios from './axios'

function App() {
  const [apiData, setApiData] = useState([]);
  const [isError, setIsError] = useState("");

  // NOTE: Using Promises
  // useEffect(() => {
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/posts")
  //     .then((res) => setApiData(res.data))
  //     .catch((error) => setIsError(error.message))
  // }, []);

  // NOTE: Using async await
  const getApiData = async () => {
    try {
      const res = await axios.get("/posts");
      setApiData(res.data);
    } catch (error) {
      setIsError(error.message);
    }
  };
  useEffect(() => {
    getApiData();
  }, []);

  return (
    <>

      <h1>Axios Tutorial</h1>
      {setIsError !== "" && <h2>{isError}</h2>}
      <div className="grid">
        {apiData.slice(0, 12).map((post) => {
          const { id, title, body } = post;
          return (
            <div className='card' key={id}>
              <h2>{title.slice(0, 15).toUpperCase()}</h2>
              <p>{body.slice(0, 100)}</p>
            </div>
          );
        })}
      </div>

    </>
  )
}

export default App
