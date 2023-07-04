import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import wikiStore from "../store/wikiStore";

const Search = observer(() => {
  const { find, results } = wikiStore;
  const [result, setResult] = useState([]);
  const [inputValue, setInputValue] = useState("Поиск");
  const [size, setSize] = useState(10);
  const [lang, setLang] = useState("ru");

  const parseResponse = useCallback(() => {
    const res = results[1].map((item, index) => (
      <a
        key={index}
        href={results[3][index]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline p-2 mt-2 max-w-[420px] rounded-md border-2 border-sky-500 block"
      >
        {item}
      </a>
    ));

    setResult(res);
  }, [results]);

  useEffect(() => {
    if (results) {
      parseResponse();
    }
  }, [results, parseResponse]);

  return (
    <div className="p-4 flex justify-center">
      <div className="w-full max-w-md border rounded-lg shadow-md p-4 bg-white">
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="searchInput"
          >
            Название
          </label>
          <input
            id="searchInput"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="sizeInput"
          >
            Количество ответов
          </label>
          <input
            type="number"
            id="sizeInput"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <select
          onChange={(e) => {
            e.preventDefault();

            setLang(e.target.value);
          }}
          value={lang}
        >
          <option>ru</option>
          <option>en</option>
        </select>
        <button
          onClick={() => {
            if (inputValue && size) {
              find(inputValue, size, lang);
            }
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md ml-2"
        >
          Поиск
        </button>
        <div className="mt-4">{result}</div>
      </div>
    </div>
  );
});

export default Search;
