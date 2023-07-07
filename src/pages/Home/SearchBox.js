import { useState } from "react";
import AsyncSelect from "react-select/async";
import { alertMessage } from "../../components/Alert";
import { getSearch } from "../../services/dailyRecipesService";
import { selectStyle } from "../../shared/selectStyles";
export const SearchBox = ({
  value,
  setValue,
  options,
  setOptions,
  selectedIng,
  onSearch,
}) => {
  const getDefaultItem = () => {
    if (options.length && value) {
      let item = options.find((op) => op.value === value || op.label === value);
      if (item) {
        return item;
      }
    }
    return null;
  };
  const handleChangeSearch = (e) => {
    if (e) {
      if (selectedIng.length === 0) {
        alertMessage(
          "عذرًا!",
          "ليس لديك مكونات أضف بعض المكونات وأعِد المحاولة"
        );
      } else {
        onSearch(e.value);
        setValue(e.value);
      }
    } else {
      onSearch(null);
      setValue(null);
    }
  };
  console.log(value);
  const onType = (e) => {
    if (e.length > 2) {
      getSearch(e, setOptions);
    }
  };
  const filterItems = () => {
    return options.length > 0 && options.filter((i) => i.label.toLowerCase());
  };

  const promiseOptions = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterItems());
      }, 1000);
    });
  return (
    <div style={{ width: "100%" }}>
      <AsyncSelect
        placeholder="اضافة المكونات المتوفره ... "
        styles={selectStyle}
        key={value}
        value={getDefaultItem()}
        loadOptions={promiseOptions}
        cacheOptions
        defaultOptions={options}
        onChange={handleChangeSearch}
        onInputChange={onType}
        isClearable
        isSearchable
      />
    </div>
  );
};


// <form className="form-inline md-form mr-auto mb-4">
//   <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
//   <button className="btn aqua-gradient btn-rounded btn-sm my-0" type="submit">Search</button>
// </form>