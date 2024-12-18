import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import { ReactComponent as ArrowPointerRight } from '../../assets/arrow-pointer-right.svg';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Autocomplete from '../../Components/Autocomplete/Autocomplete';
import {
  createSquare,
  editSquare,
  getLocations,
  getSectionChiefs,
  getServiceEngineers,
  getSquare,
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
    getSquareLoading,
    createSquareLoading,
    editSquareLoading,
  } = useAppSelector((state) => state.dataState);
  const [state, setState] = useState({});

  useEffect(() => {
    dispatch(getLocations());
    dispatch(getServiceEngineers());
    dispatch(getSectionChiefs());
  }, [dispatch]);

  useEffect(() => {
    if (isEdit)
      dispatch(getSquare(squareId)).then((res) => {
        const foundLocation = locations.filter(
          (location) => location?.id === (res.payload.location?.[0] || null)
        );
        const foundSi = serviceEngineers.find(
          (si) => si.id === res.payload.service_engineer[0]
        );
        const foundNu = sectionChiefs.find(
          (si) => si.id === res.payload.section_chief
        );
        const foundRegion = REGIONS.find(
          (region) => region.name === res.payload?.region
        );

        setState({
          ...res.payload,
          location: foundLocation || [],
          region: foundRegion,
          service_engineer:
            {
              id: foundSi?.service_engineer?.id,
              name: foundSi?.service_engineer?.full_name,
            } || null,
          section_chief:
            {
              id: foundNu?.section_chief?.id,
              name: foundNu?.section_chief?.full_name,
            } || null,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, squareId, locations]);

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
      console.log(state);
      dispatch(
        editSquare({
          ...state,
          region: state?.region?.id,
          location: (state.location || [])?.map(
            (singleLocation) => singleLocation?.id
          ),
          section_chief: state.section_chief?.id || null,
          service_engineer: [state.service_engineer?.id] || [],
        })
      ).then((res) => {
        if (res?.meta?.requestStatus === 'fulfilled') {
          navigate('/squares');
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
          service_engineer: [state.service_engineer?.id] || [],
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
          <button className="page-back" onClick={() => navigate('/squares')}>
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
                id: si.id,
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
                id: sectionChief.id,
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
                sectionChiefsLoading ||
                getSquareLoading ||
                createSquareLoading ||
                editSquareLoading
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
