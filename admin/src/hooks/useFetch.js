
import {useEffect,useState} from "react";
// import axiosInstance from "./api";
import axios from "axios"



const useFetch = (url) => {
  console.log("hi i m inside usefetch")
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  console.log("data before useeffect in usefetch ")
  
  useEffect(() => {
    console.log("hi i m inside of useeffect");

    const fetchData = async () => {
      
      console.log("hi i m inside fetchdata")
      setLoading(true);
      setError("");
  
      try {
        console.log("hi i m inside try of fetchdata")
        let res = await axios.get(url);
        console.log("outputing response data")
        setData(res.data);
       
        console.log(res.data)
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await  axios.get(url) ;
      // console.log("hi i m refetch")
      setData(res.data);

    
    } catch (err) {
      setError(err);
      console.log(err);
    }
    setLoading(false);
  };

  return { data, loading, error,reFetch};
};

export default useFetch;

