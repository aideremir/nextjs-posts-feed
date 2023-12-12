import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-t-blue-500 border-t-2 border-gray-300"></div>
    </div>
  );
};

export default Spinner;
