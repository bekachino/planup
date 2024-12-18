import React, { lazy, useEffect, useState } from 'react';
import { ReactComponent as ArrowPointerRight } from '../../assets/arrow-pointer-right.svg';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  createServiceEngineer,
  getSectionChiefs,
  getUsers,
} from '../../features/data/dataThunk';
import { addAlert } from '../../features/data/dataSlice';
import '../CreateUser/createUser.css';

const Autocomplete = lazy(
  () => import('../../Components/Autocomplete/Autocomplete')
);
const Button = lazy(() => import('../../Components/Button/Button'));

const CreateServiceEngineer = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [state, setState] = useState(null);
  const {
    users,
    usersLoading,
    createServiceEngineerLoading,
    sectionChiefs,
    sectionChiefsLoading,
  } = useAppSelector((state) => state.dataState);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getSectionChiefs());
  }, [dispatch]);

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
      createServiceEngineer({
        section_chief: state?.sectionChief?.id,
        service_engineer: state?.serviceEngineer?.id,
      })
    );

    if (createServiceEngineer.fulfilled.match(createUserReq)) {
      navigate('/service-engineers');
      dispatch(
        addAlert({
          type: 'success',
          message: 'Сервис инженер успешно создан!',
        })
      );
    }
  };

  return (
    <div className="create-user create-si">
      <div className="create-user-header">
        <button
          className="page-back"
          onClick={() => navigate('/service-engineers')}
        >
          <ArrowPointerRight />
        </button>
        <h2>Создать сервис инженера</h2>
      </div>
      <div className="create-user-body">
        <form
          className="create-user-form"
          onSubmit={onSubmit}
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            gap: '10px',
          }}
        >
          <div className="create-user-form-fields">
            <Autocomplete
              name="sectionChief"
              value={state?.sectionChief?.name}
              options={(sectionChiefs || []).map((sectionChief) => ({
                id: sectionChief?.id || null,
                name: sectionChief?.section_chief?.full_name || '-',
              }))}
              onChange={handleChange}
              label="Начальник участка"
              required
              style={{
                maxWidth: 'unset',
                minWidth: '100%',
              }}
            />
          </div>
          <div
            className="create-user-form-fields"
            style={{ marginTop: '30px' }}
          >
            <Autocomplete
              name="serviceEngineer"
              value={state?.serviceEngineer?.name}
              options={(users || []).map((user) => ({
                ...user,
                name: user?.full_name || '-',
              }))}
              onChange={handleChange}
              label="Сервис инженер"
              required
              style={{
                maxWidth: 'unset',
                minWidth: '100%',
              }}
            />
          </div>
          <div className="create-user-form-actions">
            <Button
              type="submit"
              loading={
                usersLoading ||
                createServiceEngineerLoading ||
                sectionChiefsLoading
              }
            >
              Создать
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServiceEngineer;
