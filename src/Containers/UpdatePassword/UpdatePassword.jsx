import React, { lazy, useState } from 'react';
import { ReactComponent as ArrowPointerRight } from '../../assets/arrow-pointer-right.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updatePassword } from '../../features/data/dataThunk';
import '../CreateUser/createUser.css';

const Input = lazy(() => import('../../Components/Input/Input'));
const Button = lazy(() => import('../../Components/Button/Button'));

const UpdatePassword = ({ isEdit }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { updatePasswordLoading } = useAppSelector((state) => state.dataState);
  const [state, setState] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updatePassword({
        user: state,
        userId,
      })
    ).then((res) => {
      if (res?.meta?.requestStatus === 'fulfilled') {
        navigate(`/admin/user/${userId}/`);
      }
    });
  };

  return (
    <div className="create-user">
      <div className="create-user-header">
        <button
          className="page-back"
          onClick={() => navigate(`/admin/user/${userId}/`)}
        >
          <ArrowPointerRight />
        </button>
        <h2>Смена пароля</h2>
      </div>
      <div className="create-user-body" style={{ maxWidth: '600px', margin: '100px auto' }}>
        <form className="create-user-form" onSubmit={onSubmit}>
          <div className="create-user-form-fields">
            <Input
              name="new_password"
              value={state?.new_password}
              onChange={handleChange}
              label="Новый пароль"
              placeholder="Придумайте новый пароль"
              required
              style={{maxWidth: 'unset', width: '100%'}}
            />
          </div>
          <div className="create-user-form-actions">
            <Button type="submit" loading={updatePasswordLoading}>
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
