import { useContext, useState } from "react";
import { InputContext } from "../App";

const Header = () => {
  const [value, setValue] = useState("");
  const { inputValue, setInputValue } = useContext(InputContext);

  const handleInputChange = e => setValue(e.target.value);

  const handleSubmit = () => {
    setInputValue(value);
    setValue("");
  }

  const handleInputKeyDown = (e) => {
    if(e.key === 'Enter') {
      setInputValue(value);
      setValue("")
    }
  }

  return (
    <div className="bg-stone-900">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center text-white">Simple Dictionary</h1>
        <p className="text-center mt-1 mb-10 text-slate-400 text-lg">Find Definitions for a Word</p>
      
        <div className="flex items-center justify-center mt-5">
          <div className="flex border-2 border-gray-200 rounded">
            <input className="px-2 py-2 md:w-80 rounded-sm bg-white" type="text" placeholder="Search..." onChange={handleInputChange} value={value} onKeyDown={handleInputKeyDown} />
           </div>
          <button className="bg-gray-700 px-4 py-2 mx-4 text-white rounded-md hover:bg-slate-600" onClick={handleSubmit}>Search</button>
        </div>

        { inputValue && (
          <h3 className="text-gray-50 text-center mt-4">Result for: <span className="text-white font-bold">{inputValue}</span></h3>
        ) }
      </div>
    </div>
  );
};

export default Header;
