import '../styles/simon.css';

import React, { useEffect, useMemo, useState } from 'react';

const initialSequence = Array.from({ length: 4 }, () => Math.floor(Math.random() * 4));

const SimonComponent: React.FC = () => {
  const [sequence, setSequence] = useState<number[]>(initialSequence);
  const [sequenceIndex, setSequenceIndex] = useState<number>(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('rien');
  const [manche, setManche] = useState<number>(0);

  const activeColor = useMemo(() => sequence[sequenceIndex], [sequence, sequenceIndex]);

  // Fonction pour envoyer la notification
  const sendNotification = () => {
    if (!("Notification" in window)) {
      console.log("Les notifications ne sont pas supportées par ce navigateur.");
      return;
    }

    if (Notification.permission === "granted") {
      new Notification("Bravo !", { body: "Vous avez gagné cette manche !" });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification("Bravo !", { body: "Vous avez gagné cette manche !" });
        }
      });
    }
  };

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
      setMessage('La vibration devrait fonctionner');
      navigator.vibrate(200);
    } else {
      setMessage('Pas de vibration');
      console.log("La vibration n'est pas supportée sur cet appareil.");
    }
    
    if (sequence[sequenceIndex] === color) {
      // Si c'est le dernier de la séquence, le joueur a gagné la manche
      if (sequenceIndex === sequence.length - 1) {
        // Envoi de la notification de victoire
        // sendNotification();
        
        // Ajout d'une nouvelle étape à la séquence et réinitialisation
        setSequence([...sequence, Math.floor(Math.random() * 4)]);
        setSequenceIndex(0);
        setIsPlayerTurn(false);
      } else {
        setSequenceIndex(sequenceIndex + 1);
      }
    } else {
      // Optionnel : gérer le cas d'une erreur du joueur
      setMessage("Raté ! Essaie encore.");
      // Ici, tu pourrais aussi réinitialiser la séquence ou la manche, selon ta logique de jeu
    }
  };

  const getClassP = () => `${sequenceIndex === sequence.length ? 'displayP' : 'hideP'}`;

  const getClassName = (baseClass: string, colorIndex: number) => {
    return `${baseClass} ${activeColor === colorIndex && !isPlayerTurn ? 'active' : ''}`;
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
