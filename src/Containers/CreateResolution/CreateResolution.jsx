import React, { useEffect, useState } from 'react';
import { ReactComponent as ArrowPointerRight } from '../../assets/arrow-pointer-right.svg';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  createResolution,
  editResolution,
  getResolution,
} from '../../features/data/dataThunk';
import { clearResolution } from '../../features/data/dataSlice';
import './createResolution.css';

const CreateResolution = ({ isEdit }) => {
  const { resolutionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { resolution, createResolutionLoading, editResolutionLoading } =
    useAppSelector((state) => state.dataState);
  const [state, setState] = useState(null);

  useEffect(() => {
    if (isEdit && !!resolutionId) dispatch(getResolution(resolutionId));
    return () => dispatch(clearResolution());
  }, []);

  useEffect(() => {
    if (resolution) setState({ ...resolution });
    return () => setState(null);
  }, [resolution]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      dispatch(editResolution(state)).then((res) => {
        if (res?.meta?.requestStatus === 'fulfilled') {
          navigate('/resolutions');
        }
      });
    } else {
      dispatch(createResolution(state)).then((res) => {
        if (res?.meta?.requestStatus === 'fulfilled') {
          navigate('/resolutions');
        }
      });
    }
  };

  return (
    <div className="create-resolution">
      <div className="create-resolution-paper">
        <div className="create-template-paper-header">
          <button
            className="page-back"
            onClick={() => navigate('/resolutions')}
          >
            <ArrowPointerRight />
          </button>
          <h2>{isEdit ? 'Редактировать' : 'Создать'} резолюцию</h2>
        </div>
        <form onSubmit={onSubmit}>
          <Input
            name="name"
            value={state?.name}
            placeholder="Название"
            label="Введите название"
            onChange={onChange}
            required
          />
          <Button
            type="submit"
            loading={createResolutionLoading || editResolutionLoading}
          >
            {isEdit ? 'Сохранить' : 'Создать'}
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={() => navigate('/resolutions')}
          >
            Отмена
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateResolution;
