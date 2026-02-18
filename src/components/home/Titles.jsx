import React from "react";

const Title = ({ title, description }) => {
  return (
    <div className="text-4xl font-bold text-center mt-10">
     <h3 className="text-3xl"> {title} </h3>
     <p> {description} </p>
     
    </div>
  );
};

export default Title;
