import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { InputContext } from "../App";
import Antonym from "./Antonym";
import Example from "./Example";
import MeanigList from "./MeaningList";
import Synonym from "./Synonym";

axios.defaults.baseURL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

const ResultList = () => {
  const { inputValue } = useContext(InputContext);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (param) => {
    try {
      setLoading(true);
      const res = await axios(`/${param}`);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if(inputValue.length) {
      fetchData(inputValue)
    }
  }, [inputValue]);

  if(loading) {
    return (
      <div className="flex flex-col space-y-3 animate-pulse p-4 container mx-auto max-w-2xl">
        <div className="h-6 bg-gray-400 mt-5 rounded-md"></div>
        <div className="h-40 bg-gray-400 mt-5 rounded-md"></div>
        <div className="h-8 bg-gray-400 mt-5 rounded-md"></div>
        <div className="h-40 bg-gray-400 mt-5 rounded-md"></div>
      </div>
    )
  }

  if(error) {
    return <h3 className="text-center mt-10 font-semibold text-gray-700">No Definitions Found 😥</h3>
  }

  return (
    <div className="container bg-stone-200 mx-auto my-4 p-4 max-w-8xl rounded-lg">
     {response && (
        <div>
          <h3 className="bg-slate-300 text-2xl px-1 font-bold mt-4 rounded-md">Meaning & Definitions:</h3>
          <MeanigList mean={response} />
          <h3 className="bg-slate-300 text-2xl px-1 font-bold mt-4 rounded-md">Example:</h3>
          <Example mean={response} />
          <h3 className="bg-slate-300 text-2xl px-1 font-bold mt-4 rounded-md">Synonym:</h3>
          <Synonym mean={response} />
          <h3 className="bg-slate-300 text-2xl px-1 font-bold mt-4 rounded-md">Antonym:</h3>
          <Antonym mean={response} />
        </div>
     )}
    </div>
  );
};

export default ResultList;
