// src/components/Image.js
import React, { useState } from "react";

const Image = ({ src, alt }) => {
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (event) => {
    const { offsetWidth: width, offsetHeight: height } = event.currentTarget;
    const { offsetX: x, offsetY: y } = event.nativeEvent;

    const rotateY = (x / width - 0.5) * 60; 
    const rotateX = -(y / height - 0.5) * 60; 

    setTransform({
      rotateX,
      rotateY,
    });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      className="w-1/2 h-1/2 overflow-hidden relative flex justify-center items-center mx-auto perspective-1000 "
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={src}
        alt={alt}
        className="absolute transition-transform duration-100 ease-linear"
        style={{
          transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        }}
      />
    </div>
  );
};

export default Image;
