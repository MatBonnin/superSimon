import '../styles/simon.css';

import React, { useEffect, useState } from 'react';

const SimonComponent: React.FC = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [activeColor, setActiveColor] = useState<number | null>(-1);
  const [sequenceIndex, setSequenceIndex] = useState<number>(0);
  useEffect(() => {
    const initialSequence = Array.from({ length: 4 }, () => Math.floor(Math.random() * 4));

    setSequence(initialSequence);
    console.log(initialSequence)
 
   
  }, []);
useEffect(() => {
  if (sequence && sequenceIndex < sequence.length) {
    const timeout = setTimeout(() => {
      
      setActiveColor(sequence[sequenceIndex]);

   
      const timeout2 = setTimeout(() => {
        setActiveColor(-1); 
        setSequenceIndex(sequenceIndex + 1); 
      }, 1000); 

      return () => clearTimeout(timeout2); 
    }, 1000); 

    return () => clearTimeout(timeout); 
  }
}, [sequenceIndex, sequence]);



  const getClassName = (baseClass: string, colorIndex: number) => {
    return `${baseClass} ${activeColor === colorIndex ? 'active' : ''}`;
  };

  return (
    <div className="parentSimon">
      <div className="ligne">
        <div className={getClassName('btnSimon simonVert', 0)}></div>
        <div className={getClassName('btnSimon simonRouge', 1)}></div>
      </div>
      <div className="ligne">
        <div className={getClassName('btnSimon simonJaune', 2)}></div>
        <div className={getClassName('btnSimon simonBleu', 3)}></div>
      </div>
    </div>
  );
};

export default SimonComponent;
