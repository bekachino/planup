import React, { useEffect, useMemo, useRef, useState } from 'react';
import Input from '../Input/Input';
import './select.css';

const Select = ({
  name,
  value,
  options = [],
  onChange,
  multiple = false,
  style,
}) => {
  const [inputValue, setInputValue] = useState('');
  const selectOptionsRef = useRef(null);
  const [selectOptionsHeight, setSelectOptionsHeight] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [focusedOption, setFocusedOption] = useState(-1);

  useEffect(() => {
    !multiple && setInputValue(value || '');
  }, [value]);

  useEffect(() => {
    if (selectOptionsRef.current) {
      setSelectOptionsHeight(
        window.innerHeight -
          selectOptionsRef.current.getBoundingClientRect().top -
          10
      );
    }
  }, [showOptions]);

  useEffect(() => {
    document.addEventListener('click', (event) => {
      const classNames = Array.from(event.target.classList);
      if (
        showOptions &&
        !['select-options', 'select-option', 'input'].includes(classNames[0])
      ) {
        setShowOptions(false);
        setFocusedOption(-1);
      }
    });
  }, [showOptions]);

  useEffect(() => {
    const highlightedItem = document.querySelector('.select-option-hovered');
    if (highlightedItem && showOptions && focusedOption >= 0) {
      highlightedItem.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [focusedOption, showOptions]);

  const filteredList = useMemo(
    () =>
      (multiple
        ? options.filter(
            (option) =>
              !value.find((selectedOption) => selectedOption?.id === option?.id)
          )
        : options || []
      ).filter((option) =>
        (option?.name || option?.value || option?.label).includes(inputValue)
      ),
    [inputValue, value]
  );

  const onSelectedOptionRemove = (id) => {
    onChange({
      target: {
        name,
        value: value.filter((item) => item?.id !== id),
      },
    });
  };

  const handleKeyDown = (e) => {
    console.log(e);
    if (showOptions) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (focusedOption < 0) setFocusedOption(0);
        else {
          if (focusedOption < filteredList.length - 1) {
            setFocusedOption(focusedOption + 1);
          } else setFocusedOption(0);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!focusedOption) setFocusedOption(filteredList.length - 1);
        else {
          if (focusedOption > 0) setFocusedOption(focusedOption - 1);
          else setFocusedOption(filteredList.length - 1);
        }
      } else if (e.key === 'Enter' && focusedOption >= 0) {
        e.preventDefault();
        const selectedItem = filteredList[focusedOption];
        onChange({
          target: {
            name,
            value: !multiple ? selectedItem : [...value, selectedItem],
          },
        });
        !multiple && setShowOptions(false);
      } else if (e.key === 'Backspace' && multiple) {
        const withoutLastItem = value.slice(0, value.length - 1);
        onChange({
          target: {
            name,
            value: withoutLastItem,
          },
        });
      }
      if (e.altKey && e.key === 'ArrowDown') {
        setFocusedOption(filteredList.length - 1);
      } else if (e.altKey && e.key === 'ArrowUp') {
        setFocusedOption(0);
      }
    }
  };

  return (
    <div
      className={`select-wrapper ${multiple && 'select-wrapper-multiple'}`}
      style={style}
    >
      <Input
        autoComplete="off"
        value={inputValue}
        values={multiple ? value : []}
        label="Монтажник"
        placeholder="Выберите монтажника"
        onChange={(e) => {
          setInputValue(e.target.value);
          if (!multiple) {
            onChange({
              target: {
                name,
                value: null,
              },
            });
          }
        }}
        onFocus={() => {
          setShowOptions(true);
        }}
        isSelectInput
        onValueRemove={onSelectedOptionRemove}
        onKeyDown={handleKeyDown}
      />
      {showOptions && (
        <div
          className="select-options"
          ref={selectOptionsRef}
          style={{
            maxHeight: selectOptionsHeight,
          }}
        >
          {!!filteredList.length ? (
            filteredList.map((option, i) => (
              <button
                className={`select-option ${
                  focusedOption === i && 'select-option-hovered'
                }`}
                key={option.id}
                onClick={(_) => {
                  onChange({
                    target: {
                      name,
                      value: !multiple ? option : [...value, option],
                    },
                  });
                  setShowOptions(false);
                  setFocusedOption(-1);
                  multiple && setInputValue('');
                }}
              >
                {option?.name || option?.value || option?.label}
              </button>
            ))
          ) : (
            <div className="select-option">Нет данных</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
