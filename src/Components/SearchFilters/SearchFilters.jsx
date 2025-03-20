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
import { getWorks } from '../../features/works/worksThunk';
import { setFiltersData } from '../../features/statuses/filtersDataSlice';
import { nanoid } from 'nanoid';
import moment from 'moment';
import './searchFilters.css';

const SearchFilters = ({ ...rest }) => {
  const searchFiltersCategoriesRef = useRef(null);
  const dispatch = useAppDispatch();
  const filtersData = useAppSelector((state) => state.filtersDataState);
  const filters = useAppSelector((state) => state.filtersDataState.filtersData);
  const {
    statusTypesLoading,
    resolutionTypesLoading,
    templateTypesLoading,
    squareTypesLoading,
    userTypesLoading,
  } = useAppSelector((state) => state.filtersDataState);
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

  useEffect(() => {
    const filters = getFiltersData();
    dispatch(setFiltersData(filters));
  }, [state]);

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

  const getFiltersData = () => {
    const created_at = [];
    const closed_at = [];
    const date_of_arrival = [];

    if (state?.start_date)
      created_at.push(
        moment(state?.start_date, 'DD.MM.YYYY').format('YYYY-MM-DD')
      );
    if (state?.end_date)
      created_at.push(
        moment(state?.end_date, 'DD.MM.YYYY').format('YYYY-MM-DD')
      );
    if (state?.finished_start_date)
      closed_at.push(
        moment(state?.finished_start_date, 'DD.MM.YYYY').format('YYYY-MM-DD')
      );
    if (state?.finished_end_date)
      closed_at.push(
        moment(state?.finished_end_date, 'DD.MM.YYYY').format('YYYY-MM-DD')
      );
    if (state?.desired_start_date)
      date_of_arrival.push(
        moment(state?.desired_start_date, 'DD.MM.YYYY').format('YYYY-MM-DD')
      );
    if (state?.desired_end_date)
      date_of_arrival.push(
        moment(state?.desired_end_date, 'DD.MM.YYYY').format('YYYY-MM-DD')
      );

    return {
      user_id: state.userTypes.map((item) => item.id),
      status_id: state.statusTypes.map((item) => item.id),
      resolution_id: state.resolutionTypes.map((item) => item.id),
      template_id: state.templateTypes.map((item) => item.id),
      squares_id: state.squareTypes.map((item) => item.id),
      created_at,
      closed_at,
      date_of_arrival,
    };
  };

  const onSubmit = () => {
    dispatch(
      getWorks({
        filtersData: filters,
        searchWord,
      })
    );
    setShowCategories(false);
  };

  const onReset = async () => {
    setState({
      userTypes: [],
      resolutionTypes: [],
      templateTypes: [],
      statusTypes: [],
      squareTypes: [],
    });
  };
  
  const finishedDatePeriodOption = () => (
    <div className="search-filters-categories-options-inner search-filters-date-period">
      <DatetimePicker
        name="finished_start_date"
        placeholder="От"
        disableLabel
        value={!!state ? state?.finished_start_date : ''}
        onChange={onChange}
        noTime
        id={nanoid()}
      />
      -
      <DatetimePicker
        name="finished_end_date"
        placeholder="До"
        disableLabel
        value={!!state ? state?.finished_end_date : ''}
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
        value={!!state ? state?.start_date : ''}
        onChange={onChange}
        noTime
        id={nanoid()}
      />
      -
      <DatetimePicker
        name="end_date"
        placeholder="До"
        disableLabel
        value={!!state ? state?.end_date : ''}
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
        value={!!state ? state?.desired_start_date : ''}
        onChange={onChange}
        noTime
        id={nanoid()}
      />
      -
      <DatetimePicker
        name="desired_end_date"
        placeholder="До"
        disableLabel
        value={!!state ? state?.desired_end_date : ''}
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
        {(currentCategory !== 'workTypes' &&
          filtersData[currentCategory]?.length) ||
        currentCategory === 'workTypes' ? (
          (currentCategory === 'workTypes'
            ? filtersData['templateTypes']?.filter((type) => !!type?.parent)
            : currentCategory === 'templateTypes'
              ? filtersData[currentCategory].filter((type) => !type?.parent)
              : filtersData[currentCategory] || []
          ).map((type) => (
            <label
              key={type.id}
              className={`${!!searchCategory && searchCategory.name === type.name ? 'filters-category-is-found' : ''}`}
            >
              <input
                type="checkbox"
                checked={
                  !!state[
                    currentCategory === 'workTypes'
                      ? 'templateTypes'
                      : currentCategory
                  ]?.find((item) => item.id === type.id)
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
                      () => i * (100 / 9) - 4
                    );
                    setShowCategoriesOptions(true);
                  }}
                  onFocus={() => {
                    setSearchFiltersCategoriesOptionPosition(
                      () => i * (100 / 9) - 4
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
              <Button onClick={onSubmit}>Фильтровать</Button>
              <Button variant="outlined" onClick={onReset}>
                Сбросить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
