import React, { lazy, useState } from 'react';
import { ReactComponent as ArrowPointerRight } from '../../assets/arrow-pointer-right.svg';
import { useNavigate } from 'react-router-dom';
import { REGIONS, ROLES_ARRAY } from '../../constants';
import { clearFormatPhoneNumber } from '../../utils';
import { useAppDispatch } from '../../app/hooks';
import { createUser } from '../../features/data/dataThunk';
import { addAlert } from '../../features/data/dataSlice';
import './createUser.css';

const Input = lazy(() => import('../../Components/Input/Input'));
const Autocomplete = lazy(
  () => import('../../Components/Autocomplete/Autocomplete')
);
const FileUpload = lazy(() => import('../../Components/FileUpload/FileUpload'));
const Button = lazy(() => import('../../Components/Button/Button'));

const CreateUser = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [state, setState] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const createUserReq = await dispatch(
      createUser({
        ...state,
        region: state?.region?.name,
        role: state?.role?.id,
        phone_number: !!state?.phone_number
          ? clearFormatPhoneNumber(state.phone_number)
          : null,
      })
    );

    if (createUser.fulfilled.match(createUserReq)) {
      navigate('/admin/home');
      dispatch(
        addAlert({
          type: 'success',
          message: 'Пользователь успешно создан!',
        })
      );
    }
  };

  return (
    <div className="create-user">
      <div className="create-user-header">
        <button className="page-back" onClick={() => navigate('/admin/home')}>
          <ArrowPointerRight />
        </button>
        <h2>Создать пользователя</h2>
      </div>
      <div className="create-user-body">
        <form className="create-user-form" onSubmit={onSubmit}>
          <div className="create-user-form-fields">
            <Input
              name="username"
              value={state?.username}
              onChange={handleChange}
              label="Имя пользователя"
              placeholder="Придумайте никнейм для пользователя"
              required
            />
            <Input
              name="full_name"
              value={state?.full_name}
              onChange={handleChange}
              label="ФИО"
              required
            />
            <Input
              type="password"
              name="password"
              value={state?.password}
              onChange={handleChange}
              label="Пароль"
              required
            />
            <Input
              name="one_c_code"
              value={state?.one_c_code}
              onChange={handleChange}
              label="Код 1С"
            />
            <Input
              name="bitrix_id"
              value={state?.bitrix_id}
              onChange={handleChange}
              label="ID Битрикс 24"
            />
            <Autocomplete
              name="role"
              value={state?.role?.value}
              options={ROLES_ARRAY}
              onChange={handleChange}
              label="Роль"
              required
            />
            <Autocomplete
              name="region"
              value={state?.region?.name}
              options={REGIONS}
              onChange={handleChange}
              label="Регион"
              required
            />
            <Input
              type="tel"
              name="phone_number"
              value={state?.phone_number}
              onChange={handleChange}
              label="Номер телефона"
              placeholder="(XXX) XXX XXX"
              required
            />
            <FileUpload
              name="photo"
              value={state?.photo}
              onChange={handleChange}
              label="Фото"
            />
          </div>
          <div className="create-user-form-actions">
            <Button type="submit">Создать</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
