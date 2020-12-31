import React, { useState } from 'react';

const TrainingButton = ({onTrainingClick}) => {

  const [ training, setTraining ] = useState(false);

  function onButtonClick() {
    onTrainingClick();
    setTraining(!training);
  }

  return (
    <div className="buttons" onClick={() => onButtonClick()}>
      <div className="toggle">{training ? 'STOP' : 'START'} A.I. TRAINING</div>
    </div>
  );
}

export default TrainingButton;
