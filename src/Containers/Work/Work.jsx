import React, { useCallback, useEffect, useState } from 'react';
import { ReactComponent as ArrowRightWhiteIcon } from '../../assets/arrow-pointer-right.svg';
import { ReactComponent as MenuBurgerIcon } from '../../assets/burger-black.svg';
import { ReactComponent as RemoveWhiteIcon } from '../../assets/remove-icon-white.svg';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import { ReactComponent as EditDarkIcon } from '../../assets/edit-dark.svg';
import { getWork } from '../../features/works/worksThunk';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import moment from 'moment';
import './work.css';

const Work = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { workFields, workChildTemplates, workLoading } = useAppSelector(
    (state) => state.worksState
  );
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [currentWorkFields, setCurrentWorkFields] = useState([]);
  const [searchWord, setSearchWord] = useState('');

  useEffect(() => {
    if (!!params?.workId) {
      dispatch(getWork(params?.workId));
    }
  }, [dispatch, params?.workId]);

  useEffect(() => {
    setCurrentWorkFields(workFields || []);
  }, [workFields]);

  const filteredWorkChildTemplates = useCallback(() => {
    return workChildTemplates.filter((childTemplate) =>
      childTemplate?.template?.name
        ?.toLowerCase()
        .includes(searchWord?.toLowerCase())
    );
  }, [searchWord, workChildTemplates]);

  const handleSearchWordChange = (e) => setSearchWord(e.target.value);

  const toggleTooltip = (value) => setTooltipOpen(value);

  const onChildTemplateChange = (id, isDefault) => {
    if (isDefault) {
      setCurrentWorkFields(workFields || []);
    } else {
      if (!id) return;
      const foundChildTemplate = (workChildTemplates || []).find(
        (workChildTemplate) => workChildTemplate?.template?.id === id
      );
      setCurrentWorkFields(foundChildTemplate?.fields || []);
    }
    toggleTooltip(false);
  };

  return (
    <div className="work">
      <div className="work-header">
        <button className="work-header-btn" onClick={() => navigate('/home')}>
          <ArrowRightWhiteIcon />
        </button>
        <h2>Наряд</h2>
        <div className="work-header-actions">
          <button
            className="work-header-btn work-header-edit-btn"
            onClick={() =>
              navigate(
                `/edit-work/${workFields?.find((workField) => workField.name === 'Шаблон')?.id}`
              )
            }
          >
            <EditDarkIcon />
          </button>
          <button className="work-header-btn work-header-delete-btn">
            <DeleteIcon />
          </button>
          {!!workFields.find(
            (workField) => workField.field_value === 'Техпод'
          ) && (
            <button
              className="work-header-btn"
              onClick={() => toggleTooltip(!tooltipOpen)}
            >
              {tooltipOpen ? <RemoveWhiteIcon /> : <MenuBurgerIcon />}
            </button>
          )}
        </div>
        {tooltipOpen && (
          <div className="work-header-tooltip">
            <input
              className="work-header-tooltip-search"
              placeholder="Выберите вид работ"
              value={searchWord}
              onChange={handleSearchWordChange}
            />
            <div className="work-header-tooltip-values">
              <button
                className="work-header-tooltip-value"
                onClick={() => onChildTemplateChange(null, true)}
              >
                Техпод
              </button>
              {filteredWorkChildTemplates().map((childTemplate, i) => (
                <button
                  className="work-header-tooltip-value"
                  key={i}
                  onClick={() =>
                    onChildTemplateChange(childTemplate.template.id)
                  }
                >
                  {childTemplate.template.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="work-body">
        {!workLoading && !workFields.length && (
          <h2 className="work-body-no-data">Нет данных</h2>
        )}
        {currentWorkFields.map((workField, i) => (
          <div className="work-value-row" key={i}>
            <span className="work-row-name">{workField.name || '-'}</span>
            <span className="work-row-value">
              {workField.name === 'Желаемая дата  приезда'
                ? !!workField.field_value
                  ? moment(workField.field_value).format('DD-MM-YYYY HH:mm')
                  : '-'
                : workField.field_value || '-'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
