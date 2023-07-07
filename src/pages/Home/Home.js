import { useEffect, useState, useRef } from "react";
import {
  fetchFoods,
  fetchIngredients,
} from "../../services/dailyRecipesService";
import { SideMenu } from "../Sidebar/SideMenu";
import { FoodList } from "./FoodList";
import "./Home.css";
import { SearchBox } from "./SearchBox";
import Nav from "./Nav";
// import Footer from "./Footer";


export const Home = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIng, setSelectedIng] = useState([]);
  const [result, setResult] = useState([]);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);


  useEffect(() => {
    fetchIngredients(setIngredients);
  }, []);


  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }


  const prevProps = usePrevious({
    selectedIng,
  });

  useEffect(() => {
    if (prevProps) {
      if (
        JSON.stringify(prevProps?.selectedIng) !== JSON.stringify(selectedIng)
      ) {
        onSearch();
      }

      if (selectedIng.length === 0 && !value) {
        setResult([]);
      }
    }
  }, [selectedIng , value]);


  const onSearch = (searchValue) => {
    let params = {
      needsimage: 1,
      app: 1,
      kitchen: selectedIng.length ? selectedIng.toString() : null,
      focus: null,
      exclude: null,
      kw: searchValue ? searchValue : null,
      catname: null,
      start: 0,
      fave: false,
      lang: "ar",
      cv: 2,
    };
    fetchFoods(setResult, params);
  };

  return (
    <div className="page-wrapper ">
      {<Nav />}
      <div className="content  ">
        <SideMenu
          ingredients={ingredients}
          selectedIng={selectedIng}
          setSelectedIng={setSelectedIng}
        />

        <div className="food_container">
          <SearchBox
            options={options}
            setOptions={setOptions}
            selectedIng={selectedIng}
            onSearch={onSearch}
            value={value}
            setValue={setValue}
          />
          <div
            style={{ background: "red", width: "100%", position: "relative" }}>
            <div
              className="overlay"
              style={{
                background: "black",
                position: "absolute",
                width: "100%",
                height: "100%",
                opacity: "0.6",
              }}>
              a
            </div>
            <img
              style={{ width: "100%" }}
              src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
            <FoodList  result={result} selectedIng={selectedIng} />
          </div>
        </div>
      </div>

     
    </div>
  );


};


