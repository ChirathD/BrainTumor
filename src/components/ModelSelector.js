import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const ModelSelector = (props) => {
    // const [radioValue, setRadioValue] = useState('1');
  
    const radios = [
      { name: 'Model 01', value: '1' },
      { name: 'Model 02', value: '2' },
    ];

    return (
    <>
      <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? 'outline-success' : 'outline-danger'}
            name="radio"
            value={radio.value}
            checked={props.radioValue === radio.value}
            onChange={(e) => props.setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </>
    )
}

export default ModelSelector
