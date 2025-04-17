import React, { useEffect, useRef, useState } from 'react';
import Button from '../../Components/Button/Button';
import { ReactComponent as AddIcon } from '../../assets/add-white.svg';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getWorkFields, getWorks } from '../../features/works/worksThunk';
import { DATE_FIELDS, STATUS_ICONS, WORK_STATUSES } from '../../constants';
import ManipulateWorksFields from '../../Components/ManipulateWorksFields/ManipulateWorksFields';
import Pagination from '../../Components/Pagination/Pagination';
import moment from 'moment';
import './works.css';

const Works = () => {
  const dispatch = useAppDispatch();
  const dutiesTableRef = useRef(null);
  const {
    works,
    worksLoading,
    shownFields,
    availFieldsLoading,
    total_records,
  } = useAppSelector((state) => state.worksState);
  const { filtersData } = useAppSelector((state) => state.filtersDataState);
  const [dutiesTableHeight, setDutiesTableHeight] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [
    worksFieldsManipulationModalOpen,
    setWorksFieldsManipulationModalOpen,
  ] = useState(false);

  useEffect(() => {
    dispatch(
      getWorks({
        currentPage,
        filtersData,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch(getWorkFields());
  }, [dispatch]);

  useEffect(() => {
    if (dutiesTableRef.current) {
      setDutiesTableHeight(
        window.innerHeight -
          dutiesTableRef.current.getBoundingClientRect().top -
          65
      );
    }
  }, [works]);

  const toggleModal = (value) => setWorksFieldsManipulationModalOpen(value);

  const getTableCellValue = (workField) => {
    if (!!workField?.field_value) {
      if (['Номер наряда', 'Битрикс ID'].includes(workField.name)) {
        return (
          <Link
            to={
              workField.name === 'Номер наряда'
                ? `/work/${workField?.id}`
                : workField.name === 'Битрикс ID'
                  ? `https://bitrix24.snt.kg/crm/deal/details/${workField.field_value}/`
                  : '/home'
            }
            target={workField.name === 'Битрикс ID' ? '_blank' : '_self'}
          >
            {workField.field_value || '-'}
          </Link>
        );
      } else if (DATE_FIELDS.includes(workField.name)) {
        return !!workField.field_value
          ? moment(workField.field_value).format('DD-MM-YYYY HH:mm')
          : '-';
      } else {
        return workField.field_value || '-';
      }
    } else return '-';
  };

  return (
    <div className="home">
      <ManipulateWorksFields
        open={worksFieldsManipulationModalOpen}
        toggleModal={toggleModal}
      />
      <div className="home-wrapper">
        <div className="home-wrapper-inner">
          <strong>Всего нарядов: {total_records}</strong>
          <Button
            className="home-table-add-field-btn"
            color="secondary"
            onClick={() => toggleModal(true)}
          >
            <AddIcon />
            Добавить поле
          </Button>
        </div>
        <div
          className="home-table-wrapper"
          style={{
            maxHeight: dutiesTableHeight,
          }}
          ref={dutiesTableRef}
        >
          <table>
            <thead>
              <tr>
                {worksLoading && (
                  <th>
                    <span className="duty-item-cell-title-text">
                      Загрузка...
                    </span>
                  </th>
                )}
                {!worksLoading &&
                  !availFieldsLoading &&
                  (shownFields || [])
                    .filter((workField) => !!workField)
                    .map((workField, i) => (
                      <th key={i}>
                        <span className="duty-item-cell-title-text">
                          {workField}
                        </span>
                      </th>
                    ))}
                {!worksLoading &&
                  !availFieldsLoading &&
                  (!works.length || !shownFields.length) && (
                    <th>
                      <span className="duty-item-cell-title-text">
                        Нет данных
                      </span>
                    </th>
                  )}
              </tr>
            </thead>
            <tbody>
              {!!shownFields.length &&
                (works || []).map((work, i) => (
                  <tr
                    className={`duty-item-status-${WORK_STATUSES[work.find((workField) => workField.name === 'Статус')?.field_value]}`}
                    key={i}
                  >
                    {(shownFields || [])
                      .filter((field) => !!field)
                      .map((workField, i) => (
                        <td key={i}>
                          <span className="duty-item-cell-value">
                            {workField === 'Статус' &&
                              STATUS_ICONS[
                                work.find(
                                  (workCell) => workCell.name === workField
                                ).field_value
                              ]}
                            <span className="duty-item-cell-value-text">
                              {(() => {
                                const value = work.find(
                                  (workCell) => workCell.name === workField
                                );

                                if (
                                  value?.name?.startsWith('Отчет') &&
                                  value?.data_type === 'int'
                                ) {
                                  const sum = work
                                    .filter(
                                      (workCell) => workCell.name === workField
                                    )
                                    .map((workCell) =>
                                      !!workCell?.field_value
                                        ? Number(workCell?.field_value)
                                        : 0
                                    )
                                    .reduce(
                                      (acc, workCellValue) =>
                                        acc + workCellValue
                                    );
                                  return getTableCellValue({
                                    ...value,
                                    field_value: sum,
                                  });
                                }

                                return getTableCellValue(value);
                              })()}
                            </span>
                          </span>
                        </td>
                      ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default Works;
