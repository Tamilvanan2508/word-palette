import React, { useState } from "react";
import CommonInput from "../../components/CommonInput";
import CommonButton from "../../components/CommonButton";
import CustomLoader from "../../components/CustomLoader";
import ColorCard from "../../components/ColorCard";
import { debounceFunction } from "../../utils/debounce";

const URL = "https://culr.netlify.app/.netlify/functions/culr";

const PaletteGenerator = () => {
  const [searchValue, setaSearchValue] = useState("");
  const [colorsList, setColorsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const grabImages = async (keyword) => {
    if (!keyword) return [];
    try {
      const response = await fetch(`${URL}/?search=${keyword}`);
      console.log("response", response);
      const data = await response.json();
      return data.images || [];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const onChange = async (event) => {
    setLoading(true);
    const { value } = event?.target || {};
    setaSearchValue(value);
    debounceFunction(async () => {
      const data = await grabImages(value);
      const filteredColors = data.map((item) => ({
        id: item?.id,
        hexCode: item?.color?.hex,
      }));
      setColorsList(filteredColors);
      setLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    setaSearchValue("");
    setColorsList([]);
  };

  return (
    <div className="flex items-center justify-start bg-midnight m-5">
      <div className="w-full">
        <CommonInput
          name="search"
          placeHolder="Search for colors"
          value={searchValue}
          onChange={onChange}
        />
        <div className="flex justify-center my-3">
          <CommonButton label="Reset" onClick={handleReset} />
        </div>
        {loading ? (
          <CustomLoader />
        ) : (
          <>
            {colorsList?.length > 0 ? (
              <div className="flex flex-wrap justify-center">
                {colorsList.map((color) => (
                  <ColorCard key={color.id} {...color} />
                ))}
              </div>
            ) : (
              <p
                className={`text-center text-lg text-gray-600 mt-4 ${
                  searchValue?.length > 0 ? "" : "hidden"
                } `}
              >
                No data found 😟
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PaletteGenerator;
