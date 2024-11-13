import React, { useEffect, useRef, useState } from 'react';
import Input from '../Input/Input';
import './select.css';

const Select = ({
  name,
  value,
  options = [],
  onChange,
}) => {
  const [searchWord, setSearchWord] = useState('');
  const selectOptionsRef = useRef(null);
  const [selectOptionsHeight, setSelectOptionsHeight] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  
  useEffect(() => {
    if (selectOptionsRef.current) {
      setSelectOptionsHeight(window.innerHeight - selectOptionsRef.current.getBoundingClientRect().top - 10);
    }
  }, [showOptions]);
  
  useEffect(() => {
    document.addEventListener('click', (event) => {
      const classNames = Array.from(event.target.classList);
      if (![
        'select-options',
        'select-option',
        'input',
      ].includes(classNames[0])) {
        setShowOptions(false);
      }
    });
  }, []);
  
  return (
    <div className='select-wrapper'>
      <Input
        value={searchWord}
        label='Монтажник'
        placeholder='Выберите монтажника'
        onChange={e => {
          setSearchWord(e.target.value);
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
        onBlur={() => {
          if (!value) {
            setTimeout(() => setSearchWord(''), 100)
          }
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
        ).includes(searchWord)).length ? (
          options || []
        ).filter(option => (
          option.name || option.value
        ).includes(searchWord)).map(option => (
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