import '../styles/simon.css';

import React, { useEffect, useMemo, useState } from 'react';

const initialSequence = Array.from({ length: 4 }, () => Math.floor(Math.random() * 4));

const SimonComponent: React.FC = () => {
  const [sequence, setSequence] = useState<number[]>(initialSequence);
  const [sequenceIndex, setSequenceIndex] = useState<number>(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(false);
  const [message,setMessage]= useState<string>('rien')

  const [manche, setManche] = useState<number>(0);

  const activeColor = useMemo(() => {
    return sequence[sequenceIndex];
  }, [sequence, sequenceIndex]);

  // const message = useMemo(() => {
  //   if (sequenceIndex === sequence.length - 1){
  //     return 'Vous avez gagné'
  //   }
  //   else{
  //     return 'A vous de jouer'
  //   }
   
  // }, [sequence, sequenceIndex]);




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
    if (navigator.vibrate) {
      // Vibre pendant 200 ms
      setMessage('La vibration devrait focntionner')
      navigator.vibrate(200);
      
    } else {
      setMessage('pas de vibration');
      console.log("La vibration n'est pas supportée sur cet appareil.");
    }
    if (sequence[sequenceIndex] === color) {
      if (sequenceIndex === sequence.length - 1) {
        
        setSequence([...sequence, Math.floor(Math.random() * 4)])
        setSequenceIndex(0)
        setIsPlayerTurn(false)
      }
      else{
        setSequenceIndex(sequenceIndex + 1);

      }
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
      <p>{message}</p> {/* Affiche le message dynamique */}
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