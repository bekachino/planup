import { useAppSelector } from '../../app/hooks';
import axiosApi from '../../axiosApi';
import { useEffect, useState } from 'react';
import { uploadWorks } from '../../utils';

const useUploadWorks = () => {
  const { shownFields } = useAppSelector((state) => state.worksState);
  const [data, setData] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    if (data.length) uploadWorks(data, shownFields);
    setUploadLoading(false);
  }, [data, shownFields]);

  const fetchAndUploadWorks = async () => {
    try {
      setUploadLoading(true);
      const req = await axiosApi('/v2/order-list/?page_size=999999&page=1');
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
