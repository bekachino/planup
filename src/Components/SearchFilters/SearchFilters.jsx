import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getResolutionTypes,
  getSquareTypes,
  getStatusTypes,
  getTemplateTypes,
  getUserTypes,
} from '../../features/statuses/filtersDataThunk';
import { FILTER_CATEGORIES } from '../../constants';
import Button from '../Button/Button';
import DatetimePicker from '../DatetimePicker/DatetimePicker';
import { nanoid } from 'nanoid';
import './searchFilters.css';

const SearchFilters = ({ ...rest }) => {
  const searchFiltersCategoriesRef = useRef(null);
  const dispatch = useAppDispatch();
  const filtersData = useAppSelector((state) => state.filtersDataState);
  const {
    statusTypesLoading,
    resolutionTypesLoading,
    templateTypesLoading,
    squareTypesLoading,
  } = useAppSelector((state) => state.filtersDataState);
  const { userTypes, userTypesLoading } = useAppSelector(
    (state) => state.dataState
  );
  const [
    searchFiltersCategoriesOptionPosition,
    setSearchFiltersCategoriesOptionPosition,
  ] = useState(6);
  const [showCategoriesOptions, setShowCategoriesOptions] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('userTypes');
  const [state, setState] = useState({
    userTypes: [],
    resolutionTypes: [],
    templateTypes: [],
    statusTypes: [],
    squareTypes: [],
  });

  const filtersValues = useCallback(() => {
    return [
      ...(state['userTypes'] || []),
      ...(state['resolutionTypes'] || []),
      ...(state['templateTypes'] || []),
      ...(state['statusTypes'] || []),
      ...(state['squareTypes'] || []),
    ];
  }, [state]);
  const [searchWord, setSearchWord] = useState('');
  const [searchCategory, setSearchCategory] = useState(null);

  useEffect(() => {
    dispatch(getTemplateTypes());
    dispatch(getResolutionTypes());
    dispatch(getStatusTypes());
    dispatch(getSquareTypes());
    dispatch(getUserTypes());
  }, [dispatch]);

  useEffect(() => {
    const handleMouseDown = (e) => {
      const mouseOnSearchFilters = () => {
        const classList = document
          .elementsFromPoint(e.clientX, e.clientY)
          .map((element) => Array.from(element.classList))
          .flat();
        if (
          !classList.includes('search-filters-tooltip') &&
          !classList.includes('search-filters-input') &&
          !classList.includes('search-filters-categories-options') &&
          !classList.includes('date-time-calendar')
        )
          return true;
      };
      if (mouseOnSearchFilters()) setShowCategories(false);
    };
    document.body.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.body.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  useEffect(() => {
    if (searchWord) {
      const foundCategoryOption = [
        ...(filtersData['userTypes'] || []),
        ...(filtersData['resolutionTypes'] || []),
        ...(filtersData['templateTypes'] || []),
        ...(filtersData['statusTypes'] || []),
        ...(filtersData['squareTypes'] || []),
      ].find((option) =>
        (option?.name || '').toLowerCase().includes(searchWord?.toLowerCase())
      );

      if (!!foundCategoryOption) {
        setSearchFiltersCategoriesOptionPosition(
          () => foundCategoryOption.index * (100 / 8) - 4
        );
        setCurrentCategory(foundCategoryOption.category);
        setShowCategoriesOptions(true);
        setSearchCategory(foundCategoryOption);
        document
          .querySelector('label.filters-category-is-found')
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
      } else {
        setShowCategoriesOptions(false);
        setSearchCategory(null);
      }
    } else {
      setShowCategoriesOptions(false);
      setSearchCategory(null);
    }
  }, [searchWord, filtersData]);

  const onChange = (e) => {
    const { name, value } = e.target;

    if (
      [
        'finished_start_date',
        'finished_end_date',
        'start_date',
        'end_date',
        'desired_start_date',
        'desired_end_date',
      ].includes(name)
    ) {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      return;
    }

    if (!!state[name] && !!state[name].find((item) => item.id === value.id)) {
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

  const finishedDatePeriodOption = () => (
    <div className="search-filters-categories-options-inner search-filters-date-period">
      <DatetimePicker
        name="finished_start_date"
        placeholder="От"
        disableLabel
        value={!!state ? state?.finished_start_date : null}
        onChange={onChange}
        noTime
        id={nanoid()}
      />
      -
      <DatetimePicker
        name="finished_end_date"
        placeholder="До"
        disableLabel
        value={!!state ? state?.finished_end_date : null}
        onChange={onChange}
        noTime
        id={nanoid()}
      />
    </div>
  );

  const datePeriodOption = () => (
    <div className="search-filters-categories-options-inner search-filters-date-period">
      <DatetimePicker
        name="start_date"
        placeholder="От"
        disableLabel
        value={!!state ? state?.start_date : null}
        onChange={onChange}
        noTime
        id={nanoid()}
      />
      -
      <DatetimePicker
        name="end_date"
        placeholder="До"
        disableLabel
        value={!!state ? state?.end_date : null}
        onChange={onChange}
        noTime
        id={nanoid()}
      />
    </div>
  );

  const desiredDateOption = () => (
    <div className="search-filters-categories-options-inner search-filters-date-period">
      <DatetimePicker
        name="desired_start_date"
        placeholder="От"
        disableLabel
        value={!!state ? state?.desired_start_date : null}
        onChange={onChange}
        noTime
        id={nanoid()}
      />
      -
      <DatetimePicker
        name="desired_end_date"
        placeholder="До"
        disableLabel
        value={!!state ? state?.desired_end_date : null}
        onChange={onChange}
        noTime
        id={nanoid()}
      />
    </div>
  );

  const searchFiltersCategoryOptions = () => (
    <div className="search-filters-categories-options-inner">
      <div
        className={`search-filters-category-options-inner-options ${
          (currentCategory === 'userTypes' && userTypesLoading) ||
          (currentCategory === 'resolutionTypes' && resolutionTypesLoading) ||
          (currentCategory === 'templateTypes' && templateTypesLoading) ||
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
                  !!state[currentCategory]?.find((item) => item.id === type.id)
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
  );

  return (
    <div className="search-filters">
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
      <div className="search-filters-tooltip">
        <div
          className="search-filters-values"
          style={{
            display:
              showCategories && !!filtersValues().length ? 'flex' : 'none',
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
              {FILTER_CATEGORIES.map((category, i) => (
                <button
                  className="search-filters-category"
                  onMouseEnter={(_) => {
                    setCurrentCategory(category.name);
                    setSearchFiltersCategoriesOptionPosition(
                      () => i * (100 / 8) - 4
                    );
                    setShowCategoriesOptions(true);
                  }}
                  onFocus={() => {
                    setSearchFiltersCategoriesOptionPosition(
                      () => i * (100 / 8) - 4
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
                {currentCategory === 'finished'
                  ? finishedDatePeriodOption()
                  : currentCategory === 'created_date'
                    ? datePeriodOption()
                    : currentCategory === 'desired_date'
                      ? desiredDateOption()
                      : searchFiltersCategoryOptions()}
              </div>
            </div>
            <div className="search-filter-actions">
              <Button>Фильтровать</Button>
              <Button variant="outlined">Сбросить</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
