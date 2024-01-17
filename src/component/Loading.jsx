import React from "react";
import { Rings } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="loader">
      <Rings color="#00BFFF" height={200} width={200} />
    </div>
  );
};

export default Loading;
