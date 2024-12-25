import React, { useEffect, useRef, useState } from 'react';
import Button from '../../Components/Button/Button';
import { ReactComponent as AddIcon } from '../../assets/add-white.svg';
import { ReactComponent as ArrowLeftIcon } from '../../assets/arrow-left.svg';
import { ReactComponent as ArrowRightIcon } from '../../assets/arrow-right.svg';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getWorkFields, getWorks } from '../../features/works/worksThunk';
import { DATE_FIELDS, STATUS_ICONS, WORK_STATUSES } from '../../constants';
import ManipulateWorksFields from '../../Components/ManipulateWorksFields/ManipulateWorksFields';
import moment from 'moment';
import './home.css';

const Home = () => {
  const dispatch = useAppDispatch();
  const dutiesTableRef = useRef(null);
  const { works, worksLoading, shownFields, availFieldsLoading, total_pages } =
    useAppSelector((state) => state.worksState);
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

  const Pagination = () => (
    <div className="works-pagination">
      <button
        className="works-pagination-btn"
        disabled={currentPage <= 1}
        onClick={() => {
          if (currentPage > 1) setCurrentPage((prevState) => prevState - 1);
        }}
      >
        <ArrowLeftIcon />
      </button>
      {(() => {
        const pagesList = Array.from(
          { length: total_pages || 1 },
          (_, i) => i + 1
        );

        if (pagesList.length < 10) {
          return pagesList.map((pageNum) => (
            <button
              key={pageNum}
              className={`works-pagination-page-num ${currentPage === pageNum ? 'active' : ''}`}
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum}
            </button>
          ));
        }
        return (
          <>
            <button
              className={`works-pagination-page-num ${currentPage === 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>
            {currentPage > 3 && '...'}
            {pagesList.slice(1, -1).map((pageNum) =>
              pageNum === currentPage ||
              pageNum === currentPage - 1 ||
              pageNum === currentPage + 1 ||
              (currentPage === 1 && pageNum < 4) ||
              (currentPage === pagesList.slice(-1)[0] &&
                pageNum > pagesList.slice(-4)[0]) ? (
                <button
                  key={pageNum}
                  className={`works-pagination-page-num ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              ) : (
                <></>
              )
            )}
            {currentPage < pagesList.slice(-3)[0] && '...'}
            <button
              className={`works-pagination-page-num ${currentPage === pagesList.slice(-1)[0] ? 'active' : ''}`}
              onClick={() => setCurrentPage(pagesList.slice(-1)[0])}
            >
              {pagesList.slice(-1)[0]}
            </button>
          </>
        );
      })()}
      <button
        className="works-pagination-btn"
        disabled={currentPage >= total_pages}
        onClick={() => {
          if (currentPage < total_pages)
            setCurrentPage((prevState) => prevState + 1);
        }}
      >
        <ArrowRightIcon />
      </button>
    </div>
  );

  return (
    <div className="home">
      <ManipulateWorksFields
        open={worksFieldsManipulationModalOpen}
        toggleModal={toggleModal}
      />
      <div className="home-wrapper">
        <Button
          className="home-table-add-field-btn"
          color="secondary"
          onClick={() => toggleModal(true)}
        >
          <AddIcon />
          Добавить поле
        </Button>
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
                              {getTableCellValue(
                                work.find(
                                  (workCell) => workCell.name === workField
                                )
                              )}
                            </span>
                          </span>
                        </td>
                      ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Pagination />
      </div>
    </div>
  );
};

export default Home;
