import { useAppSelector } from '../../app/hooks';
import axiosApi from '../../axiosApi';
import { useEffect, useState } from 'react';
import { uploadWorks } from '../../utils';

const useUploadWorks = () => {
  const { shownFields } = useAppSelector((state) => state.worksState);
  const filters = useAppSelector((state) => state.filtersDataState.filtersData);
  const [data, setData] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    if (data.length) uploadWorks(data, shownFields);
    setUploadLoading(false);
  }, [data, shownFields]);

  const fetchAndUploadWorks = async () => {
    try {
      setUploadLoading(true);
      const user_id_query = `&user_id=${filters?.user_id || []}`;
      const resolution_id_query = `&resolution_id=${filters?.resolution_id || []}`;
      const template_id_query = `&template_id=${filters?.template_id || []}`;
      const status_id_query = `&status_id=${filters?.status_id || []}`;
      const squares_id_query = `&squares_id=${filters?.squares_id || []}`;
      const created_at_query = `&created_at=${filters?.created_at || []}`;
      const closed_at_query = `&closed_at=${filters?.closed_at || []}`;
      const date_of_arrival_start_query = `&date_of_arrival=${filters?.date_of_arrival || []}`;
      
      const req = await axiosApi(
        `/v2/order-list/?page_size=999999&page=1${user_id_query}${resolution_id_query}${status_id_query}${template_id_query}${created_at_query}${closed_at_query}${squares_id_query}${date_of_arrival_start_query}`
      );
      const res = await req.data;
      const worksForUpload =
        (res?.results || []).map((work) => [
          {
            id: work.id || null,
            name: 'Номер наряда',
            field_value: work.id || null,
          },
          {
            id: work.bitrix_id || null,
            name: 'Битрикс ID',
            field_value: work.bitrix_id || null,
          },
          {
            id: work.status?.id || null,
            name: 'Статус',
            field_value: work.status?.name || null,
          },
          {
            id: work.works?.[0]?.template?.id || null,
            name: 'Шаблон',
            field_value: work.works?.[0]?.template?.name || null,
          },
          {
            name: 'Дата создания',
            field_value: work.created_at || null,
          },
          {
            name: 'Дата закрытия',
            field_value: work.closed_at || null,
          },
          {
            name: 'Квадрат',
            field_value: work.squares_id?.name || null,
          } || null,
          {
            name: 'Исполнитель',
            field_value: work.user_id?.name || null,
          } || null,
          ...(work.works?.[0]?.fields || []),
        ]) || [];
      setData(worksForUpload);
    } catch (error) {
      console.error('Ошибка загрузки работ:', error);
    }
  };

  return {
    fetchAndUploadWorks,
    uploadLoading,
  };
};

export default useUploadWorks;
