import React from 'react';
 
interface CardProps {
  id: number;
  title: string;
  text: string;
  bgColor?: string;
  textColor?: string;
}
 
const Card: React.FC<CardProps> = ({ title, text }) => {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-base">{text}</p>
    </div>
  );
};
 
export default Card;