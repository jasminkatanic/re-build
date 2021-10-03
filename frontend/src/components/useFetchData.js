import { useState } from "react/cjs/react.development";
import axios from "axios";
import { useEffect } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(url)       
    .then(res => setData(res.data))
    .catch(err => {setError(err)})
  },[url])

  return {data, error};
}
 
export default useFetchData;