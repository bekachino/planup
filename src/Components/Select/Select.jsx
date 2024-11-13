import React, { useEffect, useRef, useState } from 'react';
import Input from '../Input/Input';
import './select.css';

const Select = ({
  name,
  value,
  options = [],
  onChange,
}) => {
  const [inputValue, setInputValue] = useState('');
  const selectOptionsRef = useRef(null);
  const [selectOptionsHeight, setSelectOptionsHeight] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  
  useEffect(() => {
    setInputValue(value || '');
  }, [value]);
  
  useEffect(() => {
    if (selectOptionsRef.current) {
      setSelectOptionsHeight(window.innerHeight - selectOptionsRef.current.getBoundingClientRect().top - 10);
    }
  }, [showOptions]);
  
  useEffect(() => {
    document.addEventListener('click', (event) => {
      const classNames = Array.from(event.target.classList);
      if (showOptions && ![
        'select-options',
        'select-option',
        'input',
      ].includes(classNames[0])) {
        setShowOptions(false);
      }
    });
  }, [showOptions]);
  
  return (
    <div className='select-wrapper'>
      <Input
        value={inputValue}
        label='Монтажник'
        placeholder='Выберите монтажника'
        onChange={e => {
          setInputValue(e.target.value);
          onChange({
            target: {
              name,
              value: null,
            },
          });
        }}
        onFocus={() => {
          setShowOptions(true);
        }}
        isSelectInput
      />
      {showOptions && <div
        className='select-options'
        ref={selectOptionsRef}
        style={{
          maxHeight: selectOptionsHeight,
        }}
      >
        {!!(
          options || []
        ).filter(option => (
          option.name || option.value
        ).includes(inputValue)).length ? (
          options || []
        ).filter(option => (
          option.name || option.value
        ).includes(inputValue)).map(option => (
          <div
            className='select-option'
            key={option.id}
            onClick={_ => {
              onChange({
                target: {
                  name,
                  value: option,
                },
              });
              setShowOptions(false);
            }}
          >{option.name}</div>
        )) : <div
          className='select-option'
        >Нет данных</div>}
      </div>}
    </div>
  );
};

export default Select;