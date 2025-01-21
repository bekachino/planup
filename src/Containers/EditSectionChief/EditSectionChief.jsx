import React, { lazy, useEffect, useState } from 'react';
import { ReactComponent as ArrowPointerRight } from '../../assets/arrow-pointer-right.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { REGIONS, ROLES_ARRAY } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  editSectionChief,
  getSectionChief,
} from '../../features/data/dataThunk';
import Checkbox from '../../Components/Checkbox/Checkbox';
import { nanoid } from 'nanoid';
import '../CreateUser/createUser.css';
import { clearFormatPhoneNumber } from '../../utils';

const Input = lazy(() => import('../../Components/Input/Input'));
const Autocomplete = lazy(
  () => import('../../Components/Autocomplete/Autocomplete')
);
const FileUpload = lazy(() => import('../../Components/FileUpload/FileUpload'));
const Button = lazy(() => import('../../Components/Button/Button'));

const EditSectionChief = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { sectionChiefLoading, editSectionChiefLoading } = useAppSelector(
    (state) => state.dataState
  );
  const [state, setState] = useState(null);

  useEffect(() => {
    dispatch(getSectionChief(userId)).then((res) =>
      setState({
        ...res?.payload?.section_chief,
        role: ROLES_ARRAY.find(
          (role) => role.id === res?.payload?.section_chief?.role
        ),
        region: REGIONS.find(
          (region) => region.id === res?.payload?.section_chief?.region
        ),
        phone_number: !!res?.payload?.section_chief?.phone_number
          ? `(${res?.payload?.section_chief?.phone_number.slice(-9, -6)}) ${res?.payload?.section_chief?.phone_number.slice(-6, -3)} ${res?.payload?.section_chief?.phone_number.slice(-3)}`
          : '',
      })
    );
  }, [dispatch]);

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
      editSectionChief({
        ...state,
        section_chief_id: Number(userId),
        region: state?.region?.name,
        role: state?.role?.id,
        phone_number: !!state?.phone_number
          ? clearFormatPhoneNumber(state.phone_number)
          : null,
      })
    ).then((res) => {
      if (res?.meta?.requestStatus === 'fulfilled') {
        navigate('/admin/section-chiefs');
      }
    });
  };

  return (
    <div className="create-user">
      <div className="create-user-header">
        <button className="page-back" onClick={() => navigate('/admin/home')}>
          <ArrowPointerRight />
        </button>
        <h2>Редактировать начальника участка</h2>
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
            <Checkbox
              id={nanoid()}
              label="Склад"
              checked={state?.storage}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: 'storage',
                    value: e.target.checked,
                  },
                })
              }
            />
          </div>
          <div className="create-user-form-actions">
            <Button
              type="submit"
              loading={sectionChiefLoading || editSectionChiefLoading}
            >
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSectionChief;
