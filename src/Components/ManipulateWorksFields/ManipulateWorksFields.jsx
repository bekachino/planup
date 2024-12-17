import React, { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Checkbox from '../Checkbox/Checkbox';
import { nanoid } from 'nanoid';
import Button from '../Button/Button';
import { addAlert } from '../../features/data/dataSlice';
import { setShownFields } from '../../features/works/worksSlice';
import './manipulateWorksFields.css';
import { REQUIRED_WORKS_LIST_FIELDS } from '../../constants';

const ManipulateWorksFields = ({ open, toggleModal }) => {
  const dispatch = useAppDispatch();
  const { shownFields, availFieldsLoading, availFields } = useAppSelector(
    (state) => state.worksState
  );
  const [localShownFields, setLocalShownFields] = useState([]);

  useEffect(() => {
    setLocalShownFields(shownFields);
  }, [shownFields]);

  const handleFieldChange = (name, value) => {
    if (REQUIRED_WORKS_LIST_FIELDS.includes(name)) return;
    if (value) {
      setLocalShownFields([...localShownFields, name]);
    } else
      setLocalShownFields(localShownFields.filter((field) => field !== name));
  };

  const handleConfirm = () => {
    dispatch(setShownFields(localShownFields));
    dispatch(
      addAlert({
        type: 'info',
        message: 'Изменения сохранены',
      })
    );
    toggleModal(false);
  };

  return (
    <Modal
      className="manipulate-works-fields-modal"
      open={open}
      toggleModal={toggleModal}
    >
      <div className="create-template-paper-header">
        <h2>Управлять полями списка</h2>
        <span className="manipulate-works-fields-modal-desc">
          Поставьте или уберите галочку на название поля для показа/скрытия
          самого поля в списке
        </span>
      </div>
      <div className="manipulate-works-fields-body">
        <div className="manipulate-works-fields-list">
          {availFieldsLoading && (
            <span style={{ textAlign: 'center' }}>Загрузка...</span>
          )}
          {availFields.map((field, i) => (
            <Checkbox
              key={i}
              id={nanoid()}
              checked={localShownFields.includes(field)}
              label={field}
              onChange={(e) => handleFieldChange(field, e.target.checked)}
            />
          ))}
        </div>
        <div className="manipulate-works-fields-actions">
          <Button variant="outlined" onClick={() => toggleModal(false)}>
            Отменить
          </Button>
          <Button onClick={handleConfirm}>Сохранить</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ManipulateWorksFields;
