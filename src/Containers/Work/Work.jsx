import React, { useEffect } from 'react';
import { ReactComponent as ArrowRightWhiteIcon } from '../../assets/arrow-pointer-right.svg';
import { ReactComponent as MenuBurgerIcon } from '../../assets/burger-black.svg';
import { ReactComponent as RemoveWhiteIcon } from '../../assets/remove-icon-white.svg';
import { getWork } from '../../features/works/worksThunk';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './work.css';

const Work = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { workFields, workChildTemplates, workLoading } = useAppSelector(
    (state) => state.worksState
  );
  const [tooltipOpen, setTooltipOpen] = React.useState(false);

  useEffect(() => {
    if (!!params?.workId) {
      dispatch(getWork(params?.workId));
    }
  }, []);

  const toggleTooltip = (value) => setTooltipOpen(value);

  return (
    <div className="work">
      <div className="work-header">
        <button className="work-header-btn">
          <ArrowRightWhiteIcon />
        </button>
        <h2>Наряд</h2>
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
        {tooltipOpen && (
          <div className="work-header-tooltip">
            <input
              className="work-header-tooltip-search"
              placeholder="Выберите вид работ"
            />
            <div className="work-header-tooltip-values">
              {workChildTemplates.map((childTemplate) => (
                <button className="work-header-tooltip-value">
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
        {workFields.map((workField, i) => (
          <div className="work-value-row" key={i}>
            <span className="work-row-name">{workField.name || '-'}</span>
            <span className="work-row-value">
              {workField.field_value || '-'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
