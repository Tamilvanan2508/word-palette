import React, { useState } from "react";

const ColorCard = ({ name, hexCode }) => {
  const [isCopied, setIsCopied] = useState(false);

  const cardStyle = { backgroundColor: hexCode };

  const handleCopy = () => {
    navigator.clipboard.writeText(hexCode);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 mx-4 my-8">
      <div style={cardStyle} className="h-32 shadow-lg rounded-t-lg" />
      <div className="bg-white shadow-lg rounded-b-lg overflow-hidden">
        <div className="p-4">
          <p className="text-gray-600 cursor-pointer" onClick={handleCopy}>
            {isCopied ? "Copied!" : hexCode}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColorCard;
