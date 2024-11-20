import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getExecuterTypes,
  getStatusTypes,
} from '../../features/statuses/filtersDataThunk';
import { filterCategories } from '../../constants';
import './searchFilters.css';

const SearchFilters = ({ ...rest }) => {
  const searchFiltersCategoriesRef = useRef(null);
  const dispatch = useAppDispatch();
  const filtersData = useAppSelector((state) => state.filtersDataState);
  const {
    executerTypesLoading,
    statusTypesLoading,
    resolutionTypesLoading,
    templateTypesLoading,
    squareTypesLoading,
  } = useAppSelector((state) => state.filtersDataState);
  const [
    searchFiltersCategoriesOptionPosition,
    setSearchFiltersCategoriesOptionPosition,
  ] = useState(6);
  const [showCategoriesOptions, setShowCategoriesOptions] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('executerTypes');
  const [state, setState] = useState({
    executerTypes: [],
    resolutionTypes: [],
    templateTypes: [],
    statusTypes: [],
    squareTypes: [],
  });
  const filtersValues = useCallback(() => {
    return [
      ...(state['executerTypes'] || []),
      ...(state['resolutionTypes'] || []),
      ...(state['templateTypes'] || []),
      ...(state['statusTypes'] || []),
      ...(state['squareTypes'] || []),
    ];
  }, [state]);
  const [searchWord, setSearchWord] = useState('');
  const [searchCategory, setSearchCategory] = useState(null);

  useEffect(() => {
    dispatch(getExecuterTypes());
    dispatch(getStatusTypes());
  }, []);

  useEffect(() => {
    document.addEventListener('mouseup', () => setShowCategories(false));
  }, []);

  useEffect(() => {
    if (searchWord) {
      const foundCategoryOption = [
        ...(filtersData['executerTypes'] || []),
        ...(filtersData['resolutionTypes'] || []),
        ...(filtersData['templateTypes'] || []),
        ...(filtersData['statusTypes'] || []),
        ...(filtersData['squareTypes'] || []),
      ].find((option) =>
        (option?.name || '').toLowerCase().includes(searchWord?.toLowerCase())
      );

      if (!!foundCategoryOption) {
        setSearchFiltersCategoriesOptionPosition(
          () => foundCategoryOption.index * (100 / 7) - 4
        );
        setCurrentCategory(foundCategoryOption.category);
        setShowCategoriesOptions(true);
        setSearchCategory(foundCategoryOption);
        document
          .querySelector('label.filters-category-is-found')
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
      } else {
        setShowCategoriesOptions(false);
        setSearchCategory(null);
      }
    } else {
      setShowCategoriesOptions(false);
      setSearchCategory(null);
    }
  }, [searchWord]);

  const onChange = (e) => {
    const { name, value } = e.target;

    if (['start_date', 'end_date'].includes(name)) {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      return;
    }

    if (!!state[name].find((item) => item.id === value.id)) {
      setState((prevState) => ({
        ...prevState,
        [name]: prevState[name].filter((item) => item.id !== value.id),
      }));
      return;
    }

    setState((prevState) => ({
      ...prevState,
      [name]: [...prevState[name], value],
    }));
  };

  return (
    <div className="search-filters" onMouseUp={(e) => e.stopPropagation()}>
      <input
        className="search-filters-input"
        type="text"
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
        onFocus={() => setShowCategories(true)}
        onKeyDown={(e) => {
          if (showCategoriesOptions && !!searchCategory && e.key === 'Enter')
            onChange({
              target: {
                name: searchCategory.category,
                value: searchCategory,
              },
            });
        }}
        {...rest}
      />
      <div
        className="search-filters-values"
        style={{
          display: showCategories && !!filtersValues().length ? 'flex' : 'none',
        }}
      >
        <div className="search-filters-values-inner">
          {filtersValues().map((option, i) => (
            <div
              className="search-filters-value"
              key={i}
              onClick={() =>
                onChange({
                  target: {
                    name: option.category,
                    value: option,
                    category: option.category,
                  },
                })
              }
            >
              {option.name}
            </div>
          ))}
        </div>
      </div>
      <div
        className={`search-filters-block ${showCategories ? 'search-filters-block-shown' : ''}`}
        onMouseLeave={() => setShowCategoriesOptions(false)}
      >
        <div className="search-filters-block-inner">
          <span className="search-filters-block-title">Фильтрация</span>
          <div
            className="search-filters-categories"
            ref={searchFiltersCategoriesRef}
          >
            {filterCategories.map((category, i) => (
              <button
                onMouseEnter={(_) => {
                  setCurrentCategory(category.name);
                  setSearchFiltersCategoriesOptionPosition(
                    () => i * (100 / 7) - 4
                  );
                  setShowCategoriesOptions(true);
                }}
                onFocus={() => {
                  setSearchFiltersCategoriesOptionPosition(
                    () => i * (100 / 7) - 4
                  );
                  setCurrentCategory(category.name);
                }}
                key={i}
              >
                {category.value}
              </button>
            ))}
            <div
              className="search-filters-categories-options"
              style={{
                display: showCategoriesOptions ? 'flex' : 'none',
                top: `${searchFiltersCategoriesOptionPosition}%`,
              }}
              onMouseEnter={() => setShowCategoriesOptions(true)}
            >
              <div className="search-filters-categories-options-inner">
                <div
                  className={`search-filters-category-options-inner-options ${
                    (currentCategory === 'executerTypes' &&
                      executerTypesLoading) ||
                    (currentCategory === 'resolutionTypes' &&
                      resolutionTypesLoading) ||
                    (currentCategory === 'templateTypes' &&
                      templateTypesLoading) ||
                    (currentCategory === 'statusTypes' && statusTypesLoading) ||
                    (currentCategory === 'squareTypes' && squareTypesLoading)
                      ? 'search-filters-category-options-inner-options-loading'
                      : ''
                  }`}
                >
                  {filtersData[currentCategory]?.length ? (
                    (filtersData[currentCategory] || []).map((type) => (
                      <label
                        key={type.id}
                        className={`${!!searchCategory && searchCategory.name === type.name ? 'filters-category-is-found' : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={
                            !!state[currentCategory]?.find(
                              (item) => item.id === type.id
                            )
                          }
                          onChange={() =>
                            onChange({
                              target: {
                                name: type.category,
                                value: {
                                  ...type,
                                  category: type.category,
                                },
                              },
                            })
                          }
                        />
                        <span>{type.name}</span>
                      </label>
                    ))
                  ) : (
                    <label>
                      <span>Нет данных</span>
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
