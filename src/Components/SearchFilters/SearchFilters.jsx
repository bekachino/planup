import React, { useEffect, useRef, useState } from 'react';
import './searchFilters.css';

const SearchFilters = ({ ...rest }) => {
  const searchFiltersCategoriesRef = useRef(null);
  const [
    searchFiltersCategoriesOptionPosition,
    setSearchFiltersCategoriesOptionPosition,
  ] = useState(6);
  const [showCategoriesOptions, setShowCategoriesOptions] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [mouseInCategory, setMouseInCategory] = useState(false);

  useEffect(() => {
    document.addEventListener('mouseup', () => setShowCategories(false));
  }, []);

  return (
    <div className="search-filters" onMouseUp={(e) => e.stopPropagation()}>
      <input type="text" {...rest} onFocus={() => setShowCategories(true)} />
      <div
        className={`search-filters-block ${showCategories ? 'search-filters-block-shown' : ''}`}
        onMouseLeave={() => setShowCategoriesOptions(false)}
      >
        <span className="search-filters-block-title">Фильтрация</span>
        <div
          className="search-filters-categories"
          ref={searchFiltersCategoriesRef}
        >
          <button
            onMouseEnter={(_) => {
              setSearchFiltersCategoriesOptionPosition(() => 100 / 7 - 15);
              setShowCategoriesOptions(true);
            }}
            onFocus={() =>
              setSearchFiltersCategoriesOptionPosition(() => 100 / 7 - 15)
            }
          >
            Исполнитель
          </button>
          <button
            onMouseEnter={(_) => {
              setSearchFiltersCategoriesOptionPosition(
                () => 2 * (100 / 7) - 15
              );
              setShowCategoriesOptions(true);
            }}
            onFocus={() =>
              setSearchFiltersCategoriesOptionPosition(() => 2 * (100 / 7) - 15)
            }
          >
            Резолюция
          </button>
          <button
            onMouseEnter={(_) => {
              setSearchFiltersCategoriesOptionPosition(
                () => 3 * (100 / 7) - 15
              );
              setShowCategoriesOptions(true);
            }}
            onFocus={() =>
              setSearchFiltersCategoriesOptionPosition(() => 3 * (100 / 7) - 15)
            }
          >
            Шаблон
          </button>
          <button
            onMouseEnter={(_) => {
              setSearchFiltersCategoriesOptionPosition(
                () => 4 * (100 / 7) - 15
              );
              setShowCategoriesOptions(true);
            }}
            onFocus={() =>
              setSearchFiltersCategoriesOptionPosition(() => 4 * (100 / 7) - 15)
            }
          >
            Состояние
          </button>
          <button
            onMouseEnter={(_) => {
              setSearchFiltersCategoriesOptionPosition(
                () => 5 * (100 / 7) - 15
              );
              setShowCategoriesOptions(true);
            }}
            onFocus={() =>
              setSearchFiltersCategoriesOptionPosition(() => 5 * (100 / 7) - 15)
            }
          >
            Квадрат
          </button>
          <button
            onMouseEnter={(_) => {
              setSearchFiltersCategoriesOptionPosition(
                () => 6 * (100 / 7) - 15
              );
              setShowCategoriesOptions(true);
            }}
            onFocus={() =>
              setSearchFiltersCategoriesOptionPosition(() => 6 * (100 / 7) - 15)
            }
          >
            Завершенные
          </button>
          <button
            onMouseEnter={(_) => {
              setSearchFiltersCategoriesOptionPosition(
                () => 7 * (100 / 7) - 15
              );
              setShowCategoriesOptions(true);
            }}
            onFocus={() =>
              setSearchFiltersCategoriesOptionPosition(() => 7 * (100 / 7) - 15)
            }
          >
            Дата создания
          </button>
          <div
            className="search-filters-categories-options"
            style={{
              display: showCategoriesOptions ? 'flex' : 'none',
              top: `${searchFiltersCategoriesOptionPosition}%`,
            }}
            onMouseEnter={() => setShowCategoriesOptions(true)}
          >
            <div className="search-filters-categories-options-inner"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
