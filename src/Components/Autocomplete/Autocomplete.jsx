import React, { useEffect, useMemo, useRef, useState } from 'react';
import Input from '../Input/Input';
import './autocomplete.css';

const Autocomplete = ({
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
    if (e.key === 'ArrowDown') {
      setShowOptions(true);
      if (focusedOption < 0) setFocusedOption(0);
      else {
        if (focusedOption < filteredList.length - 1) {
          setFocusedOption(focusedOption + 1);
        } else setFocusedOption(0);
      }
    } else if (e.key === 'ArrowUp') {
      setShowOptions(true);
      if (!focusedOption) setFocusedOption(filteredList.length - 1);
      else {
        if (focusedOption > 0) setFocusedOption(focusedOption - 1);
        else setFocusedOption(filteredList.length - 1);
      }
    } else if (e.key === 'Enter' && focusedOption >= 0) {
      const selectedItem = filteredList[focusedOption];
      onChange({
        target: {
          name,
          value: !multiple ? selectedItem : [...value, selectedItem],
        },
      });
      !multiple && setShowOptions(false);
      multiple && setInputValue('');
    } else if (e.key === 'Backspace' && multiple) {
      if (multiple && !!inputValue) return;
      const withoutLastItem = value.slice(0, value.length - 1);
      onChange({
        target: {
          name,
          value: withoutLastItem,
        },
      });
    } else if (e.key === 'Escape' && multiple) setShowOptions(false);

    if (e.altKey && e.key === 'ArrowDown') {
      setShowOptions(true);
      setFocusedOption(filteredList.length - 1);
    } else if (e.altKey && e.key === 'ArrowUp') {
      setShowOptions(true);
      setFocusedOption(0);
    }
  };

  return (
    <div
      className={`select-wrapper ${multiple && 'select-wrapper-multiple'} ${
        !!(value || '').length && 'select-wrapper-multiple-valid'
      }`}
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
            setFocusedOption(0);
            setShowOptions(true);
          }
        }}
        onFocus={() => {
          setShowOptions(true);
        }}
        onClick={() => setShowOptions(true)}
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
                } ${!!option?.icon && 'has-icon'}`}
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
                style={{
                  backgroundImage: !!option?.icon
                    ? `url("${option?.icon}")`
                    : 'unset',
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

export default Autocomplete;
