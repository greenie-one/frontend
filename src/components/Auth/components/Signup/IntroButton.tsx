import React, { useState } from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import '../../styles/InputStyles.scss';

interface ButtonProps {
  label: string;
}

const IntroButton: React.FC<ButtonProps> = ({ label }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };
  return (
    <button onClick={handleClick} className={isActive ? 'skill active' : 'skill'}>
      <BsFillCheckCircleFill style={{ display: isActive ? 'flex' : 'none', marginRight: '2px' }} />
      {label}
    </button>
  );
};

export default IntroButton;
