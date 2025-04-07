import Button from '../Button/Button';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { ReactComponent as RefreshIcon } from '../../assets/refresh.svg';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import './listItem.css';
import { Link, useNavigate } from 'react-router-dom';

const ListItem = ({
  item,
  setModalIsOpen,
  setItemForDelete,
  editPath,
  type,
}) => {
  const { user } = useAppSelector((state) => state.userState);
  const navigate = useNavigate();

  return (
    <div className="type-item">
      {type === 'template' ? (
        <Link to={`/templates/${item?.id}`}>{item.name}</Link>
      ) : type === 'resolution' ? (
        <span className="type-item-title">{item.name}</span>
      ) : (
        <span>{item.squares}</span>
      )}
      {user?.role === 'admin' && (
        <>
          <Button className="edit-type-btn" onClick={() => navigate(editPath)}>
            <RefreshIcon />
            Обновить
          </Button>
          <Button
            className="edit-type-btn delete-type-btn"
            color="error"
            onClick={() => {
              setItemForDelete(item?.id);
              setModalIsOpen(true);
            }}
          >
            <DeleteIcon />
            Удалить
          </Button>
        </>
      )}
    </div>
  );
};

export default ListItem;
