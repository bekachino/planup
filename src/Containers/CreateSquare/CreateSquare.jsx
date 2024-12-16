import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import { ReactComponent as ArrowPointerRight } from '../../assets/arrow-pointer-right.svg';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Autocomplete from '../../Components/Autocomplete/Autocomplete';
import {
  createSquare,
  editTemplate,
  getLocations,
  getSectionChiefs,
  getServiceEngineers,
  getTemplate,
} from '../../features/data/dataThunk';
import { REGIONS } from '../../constants';
import '../CreateTemplate/createTemplate.css';

const CreateSquare = ({ isEdit }) => {
  const { squareId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    locations,
    locationsLoading,
    serviceEngineers,
    serviceEngineersLoading,
    sectionChiefs,
    sectionChiefsLoading,
  } = useAppSelector((state) => state.dataState);
  const [state, setState] = useState({});

  useEffect(() => {
    dispatch(getLocations());
    dispatch(getServiceEngineers());
    dispatch(getSectionChiefs());
    if (isEdit)
      dispatch(getTemplate(squareId)).then((res) =>
        setState({
          id: res.payload?.id,
          name: res.payload?.name,
          category: res.payload?.category?.[0] || null,
          parent: res.payload?.parent?.[0] || null,
          stage: res.payload?.stage?.[0] || null,
          fields:
            res.payload?.fields?.map((field) => ({
              field: {
                name: field?.field?.name,
                id: field?.field?.id,
              },
              id: field?.field?.id,
              required: field?.required,
            })) || [],
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      dispatch(
        editTemplate({
          ...state,
          parent: state?.parent?.id,
          stage: state?.stage?.id,
          category: Number(state?.category?.id || 0),
          fields: state.fields.map((field, i) => ({
            field: field?.field?.id,
            numbers: i + 1,
            required: field?.required,
          })),
        })
      ).then((res) => {
        if (res?.meta?.requestStatus === 'fulfilled') {
          navigate('/templates');
        }
      });
    } else {
      dispatch(
        createSquare({
          ...state,
          region: state?.region?.id,
          location: (state.location || [])?.map(
            (singleLocation) => singleLocation?.id
          ),
          section_chief: state.section_chief?.id || null,
          service_engineer: state.service_engineer?.id || null,
        })
      ).then((res) => {
        if (res?.meta?.requestStatus === 'fulfilled') {
          navigate('/squares');
        }
      });
    }
  };

  return (
    <div className="create-template">
      <div className="create-template-paper">
        <div className="create-template-paper-header">
          <button className="page-back" onClick={() => navigate('/templates')}>
            <ArrowPointerRight />
          </button>
          <h2>{isEdit ? 'Редактировать' : 'Создать'} квадрат</h2>
        </div>
        <form onSubmit={onSubmit}>
          <div className="template-field-row">
            <Input
              label="Название"
              placeholder="Введите название"
              name="squares"
              value={state?.squares}
              onChange={onChange}
              required
            />
          </div>
          <div className="template-field-row">
            <Autocomplete
              label="Регион"
              placeholder="Выберите регион"
              name="region"
              value={state?.region?.name || ''}
              options={REGIONS}
              onChange={onChange}
            />
          </div>
          <div className="template-field-row">
            <Autocomplete
              multiple
              label="Локация"
              placeholder="Выберите локацию"
              name="location"
              value={state?.location || []}
              options={locations}
              onChange={onChange}
            />
          </div>
          <div className="template-field-row">
            <Autocomplete
              label="Сервис инженер"
              placeholder="Выберите сервис инженера"
              name="service_engineer"
              value={state?.service_engineer?.name}
              options={(serviceEngineers || []).map((si) => ({
                id: si.service_engineer.id,
                name: si.service_engineer.full_name,
              }))}
              onChange={onChange}
            />
            <Autocomplete
              label="Начальник участка"
              placeholder="Выберите начальника участка"
              name="section_chief"
              value={state?.section_chief?.name || ''}
              options={(sectionChiefs || []).map((sectionChief) => ({
                id: sectionChief.section_chief.id,
                name: sectionChief.section_chief.full_name,
              }))}
              onChange={onChange}
            />
          </div>
          <div className="create-template-actions">
            <Button
              type="submit"
              variant="outlined"
              loading={
                locationsLoading ||
                serviceEngineersLoading ||
                sectionChiefsLoading
              }
            >
              {isEdit ? 'Сохранить' : 'Создать'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSquare;
