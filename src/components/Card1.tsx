import React from 'react';

interface Card1Props {
  title: string;
  description: string;
  image: string;
}
const accentColor1 = 'rgb(219 39 119)';
const accentColor = '#C2185B';
const Card1: React.FC<Card1Props> = ({ title, description, image }) => {
  return (
    
    <div className="relative h-[450px] w-full overflow-hidden rounded-xl border border-pink-300 bg-white flex flex-col justify-end">
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="absolute top-0 left-0 w-full h-[76%] object-cover z-0 px-2 pt-2"
      />

      {/* Overlay Layer */}
      <div className="absolute top-0 left-0 w-full h-[80%] z-10" />

      {/* Text Content Section */}
      <div className="relative z-20 bg-pink-100 px-10 py-10 text-center rounded-t-[50%]">
        <h3 className="text-pink-600 font-semibold text-lg mb-2" style={{ color: accentColor1 }} >{title}</h3>
        <p className="text-pink-500 text-sm leading-normal" style={{ color: accentColor }}>{description}</p>
      </div>
    </div>
  );
};

export default Card1;
