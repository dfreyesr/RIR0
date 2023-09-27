import React from "react";
import "./styles/image.scss";
import Button from "./button";

const Image = ({ src, alt, onAdd }) => {
  return (
    <div className="image-container">
      {!src && !alt ? (
        <>
          <span class="material-symbols-rounded">image</span>
          <Button text="Add image" theme="add-image" onClick={onAdd}/>
        </>
      ) : (
        <img src={src} alt={alt} />
      )}
    </div>
  );
};

export default Image;
