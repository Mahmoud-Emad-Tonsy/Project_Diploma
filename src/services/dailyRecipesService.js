import { Request } from "./requestService";
import { serialize } from "object-to-formdata";

export const fetchIngredients = (setData) => {
  Request()
    .post("/lang_ings", { lang: "ar" })
    .then((response) => {
      response.status === 200 && response.data && setData(response.data);
    })
    .catch((err) => console.log(err))
    .finally();
};

export const fetchFoods = (setResult, params) => {
  const options = {
    indices: true,
    allowEmptyArrays: false,
    booleansAsIntegers: true,
    nullsAsUndefineds: true,
  };
  const formData = serialize(params, options);
  Request()
    .post("/results", formData)
    .then((response) => {
      response.status === 200 &&
        response?.data?.results &&
        setResult(response?.data?.results);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally();
};

export const getSearch = (term, setOptions) => {
  Request()
    .get(`/dautoc?term=${term}&lang=ar`)
    .then((response) => {
      let newOptions = [];
      if (response.status === 200 && response.data.length) {
        response.data.map((element) => {
          newOptions.push({ label: element, value: element });
        });
        return setOptions(newOptions);
      }
    })
    .catch((err) => console.log(err))
    .finally();
};

export const getDetails = (rid, ingredients, setDetails, handleOpen) => {
  let params = { rid, lang: "ar", ingredients };
  const options = {
    indices: true,
    allowEmptyArrays: false,
    booleansAsIntegers: true,
    nullsAsUndefineds: true,
  };
  const formData = serialize(params, options);
  Request()
    .post("details", formData)
    .then((response) => {
      if (response.status === 200 && response.data) {
        setDetails(response.data);
        handleOpen();
      }
    })
    .catch((err) => console.log(err))
    .finally();
};
