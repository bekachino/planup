import React, { useCallback, useEffect, useState } from 'react';
import { ReactComponent as ArrowRightWhiteIcon } from '../../assets/arrow-pointer-right.svg';
import { ReactComponent as MenuBurgerIcon } from '../../assets/burger-black.svg';
import { ReactComponent as RemoveWhiteIcon } from '../../assets/remove-icon-white.svg';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import { ReactComponent as EditDarkIcon } from '../../assets/edit-dark.svg';
import { deleteWork, getWork } from '../../features/works/worksThunk';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Button from '../../Components/Button/Button';
import Modal from '../../Components/Modal/Modal';
import './work.css';

const Work = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { workFields, workChildTemplates, workLoading, deleteWorkLoading } =
    useAppSelector((state) => state.worksState);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [currentWorkFields, setCurrentWorkFields] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (!!params?.workId) {
      dispatch(getWork(params?.workId));
    }
  }, [dispatch, params?.workId]);

  useEffect(() => {
    setCurrentWorkFields(workFields || []);
  }, [workFields]);

  const toggleModal = (value) => setModalIsOpen(value);

  const onDelete = () => {
    dispatch(deleteWork(params?.workId)).then((res) => {
      if (res?.meta?.requestStatus === 'fulfilled') {
        navigate('/home');
      }
    });
  };

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
      <Modal
        open={modalIsOpen}
        toggleModal={toggleModal}
        style={{ minWidth: '600px' }}
      >
        <div
          className="create-template-paper-header"
          style={{ flexDirection: 'column' }}
        >
          <h2>Удалить наряд?</h2>
          <span className="create-template-paper-header-desc">
            Вы уверены что хотите удалить наряд?
          </span>
        </div>
        <div className="delete-modal-btns">
          <Button color="error" onClick={onDelete} loading={deleteWorkLoading}>
            Удалить
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={() => toggleModal(false)}
          >
            Отмена
          </Button>
        </div>
      </Modal>
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
                `/edit-work/${workFields?.find((workField) => workField.name === 'Номер наряда')?.field_value || 0}/${workFields?.find((workField) => workField.name === 'Шаблон')?.id || 0}`
              )
            }
          >
            <EditDarkIcon />
          </button>
          <button
            className="work-header-btn work-header-delete-btn"
            onClick={() => toggleModal(true)}
          >
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
              {workField?.data_type === 'url' ? (
                <Link to={workField.field_value} target="_blank">
                  {workField.field_value}
                </Link>
              ) : (
                workField.field_value || '-'
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
