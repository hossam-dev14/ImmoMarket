import { useState, useEffect } from 'react';

export default function DataFetcher() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setData(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data Fetcher</h1>
      {data.map((e,i) => {
        return <div key={i}>
          <h3>{e.userId}</h3>
          <h6>{e.title}</h6>
          <p>{e.body}</p>
        </div>
      })}
    </div>
  );
}

