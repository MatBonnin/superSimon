import '../styles/simon.css';

import React, { useEffect, useMemo, useState } from 'react';

const initialSequence = Array.from({ length: 4 }, () => Math.floor(Math.random() * 4));

const SimonComponent: React.FC = () => {
  const [sequence, setSequence] = useState<number[]>(initialSequence);
  const [sequenceIndex, setSequenceIndex] = useState<number>(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(false);
  

  const [message, setMessage] = useState<string>('A vous de jouer');
  const [manche, setManche] = useState<number>(0);

  const activeColor = useMemo(() => {
    return sequence[sequenceIndex];
  }, [sequence, sequenceIndex]);



  useEffect(() => {
    if (!isPlayerTurn && sequenceIndex < sequence.length) {
      setTimeout(() => {
        setSequenceIndex(sequenceIndex + 1);
      }, 1000);
    } else if (!isPlayerTurn && sequenceIndex === sequence.length) {
      setIsPlayerTurn(true);
      setSequenceIndex(0);
    }
  }, [sequenceIndex, sequence, isPlayerTurn]);

  const playerClick = (color: number) => {
    if (sequence[sequenceIndex] === color) {
      if (sequenceIndex === sequence.length - 1) {
        setMessage('Vous avez gagné');
        
        setSequence([...sequence, Math.floor(Math.random() * 4)])
        setSequenceIndex(0)
        setIsPlayerTurn(false)
      }
      else{
        setSequenceIndex(sequenceIndex + 1);

      }
    } else {
      setMessage('Vous avez perdu !');
    }

  };

  const getClassP = () => {
    return `${sequenceIndex === sequence.length ? 'displayP' : 'hideP'}`;
  };

  const getClassName = (baseClass: string, colorIndex: number) => {
    return `${baseClass} ${ (activeColor === colorIndex && !isPlayerTurn) ? 'active' : ''}`;
  };

  return (
    <div className="parentSimon">
      <p className={getClassP()}>{message}</p> {/* Affiche le message dynamique */}
      <div className="ligne">
        <button onClick={() => playerClick(0)} className={getClassName('btnSimon simonVert', 0)}></button>
        <button onClick={() => playerClick(1)} className={getClassName('btnSimon simonRouge', 1)}></button>
      </div>
      <div className="ligne">
        <button onClick={() => playerClick(2)} className={getClassName('btnSimon simonJaune', 2)}></button>
        <button onClick={() => playerClick(3)} className={getClassName('btnSimon simonBleu', 3)}></button>
      </div>
    </div>
  );
};

export default SimonComponent;