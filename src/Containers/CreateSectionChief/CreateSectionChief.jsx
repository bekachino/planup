import React, { lazy, useEffect, useState } from 'react';
import { ReactComponent as ArrowPointerRight } from '../../assets/arrow-pointer-right.svg';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createSectionChief, getUsers } from '../../features/data/dataThunk';
import { addAlert } from '../../features/data/dataSlice';
import '../CreateUser/createUser.css';

const Autocomplete = lazy(
  () => import('../../Components/Autocomplete/Autocomplete')
);
const Button = lazy(() => import('../../Components/Button/Button'));

const CreateSectionChief = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [state, setState] = useState(null);
  const { users, usersLoading, createSectionChiefLoading } = useAppSelector(
    (state) => state.dataState
  );

  useEffect(() => {
    dispatch(getUsers());
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
      createSectionChief({
        section_chief_id: state?.sectionChief?.id,
      })
    );

    if (createSectionChief.fulfilled.match(createUserReq)) {
      navigate('/admin/section-chiefs');
      dispatch(
        addAlert({
          type: 'success',
          message: 'Начальник участка успешно создан!',
        })
      );
    }
  };

  return (
    <div className="create-user create-nu">
      <div className="create-user-header">
        <button
          className="page-back"
          onClick={() => navigate('/admin/section-chiefs')}
        >
          <ArrowPointerRight />
        </button>
        <h2>Создать начальника участка</h2>
      </div>
      <div className="create-user-body">
        <form
          className="create-user-form"
          onSubmit={onSubmit}
          style={{
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          <div className="create-user-form-fields">
            <Autocomplete
              name="sectionChief"
              value={state?.sectionChief?.name}
              options={(users || []).map((user) => ({
                ...user,
                name: user?.full_name || '-',
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
          <div className="create-user-form-actions">
            <Button
              type="submit"
              loading={usersLoading || createSectionChiefLoading}
            >
              Создать
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSectionChief;
