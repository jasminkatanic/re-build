import { useState } from "react/cjs/react.development";
import axios from "axios";
import { useEffect } from "react";

const useFetchData = (url, category, pageOffset, searchTerm) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {        
    axios.get(`${url}${category}?pageOffset=${pageOffset}${searchTerm ? `&search=${searchTerm}` : ''}`)       
    .then(res =>  {
      if(pageOffset>0){
        setData([...data, ...res.data])
      }else{
        setData(res.data)
      }
    })      
    .catch(err => {setError(err)})
  },[url, category, pageOffset, searchTerm])

  return {data, error};
}
 
export default useFetchData;