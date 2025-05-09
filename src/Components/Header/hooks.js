import { useAppSelector } from '../../app/hooks';
import axiosApi from '../../axiosApi';
import { useState } from 'react';
import { uploadWorks } from '../../utils';

const useUploadWorks = () => {
  const { shownFields } = useAppSelector((state) => state.worksState);
  const filters = useAppSelector((state) => state.filtersDataState.filtersData);
  const [data, setData] = useState([]);
  const [templateNames, setTemplateNames] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);

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
      const initialTemplateNames = [];

      const worksForUpload =
        (res?.results || []).map((work) => [
          {
            id: work.id || null,
            name: 'Номер наряда' || null,
            field_value: work.id || null,
          },
          {
            id: work.bitrix_id || null,
            name: 'Битрикс ID' || null,
            field_value: work.bitrix_id || null,
          },
          {
            id: work.status.id || null,
            name: 'Статус' || null,
            field_value: work.status.name || null,
          },
          {
            id: work.works[0]?.template.id || null,
            name: 'Шаблон',
            field_value: work.works[0]?.template.name || null,
          },
          {
            name: 'Дата создания',
            field_value: work.created_at || null,
          } || null,
          {
            name: 'Дата закрытия',
            field_value: work.closed_at || null,
          } || null,
          {
            name: 'Квадрат',
            field_value: work.squares_id?.name || null,
          } || null,
          {
            name: 'Исполнитель',
            field_value: work.user_id?.name || null,
          } || null,
          {
            name: 'Виды работ',
            field_value:
              (() => {
                const childTemplates =
                  work.works.map(
                    (workField) => workField?.child_templates
                  )?.[0] || [];
                const workTypes = {
                  [work?.id]: [],
                };

                childTemplates.forEach((childTemplate) => {
                  childTemplate?.fields?.forEach((field) => {
                    if (
                      !!field?.use_template &&
                      !workTypes[work?.id].includes(
                        childTemplate?.template?.name
                      )
                    ) {
                      workTypes[work?.id].push(
                        childTemplate?.template?.name || ''
                      );
                    }
                    if (
                      !!field?.use_template &&
                      !initialTemplateNames.includes(
                        childTemplate?.template?.name || ''
                      )
                    ) {
                      initialTemplateNames.push(
                        childTemplate?.template?.name || ''
                      );
                    }
                  });
                });
                return workTypes[work?.id] || [];
              })() || null,
          } || null,
          ...(work.works[0]?.fields || []),
        ]) || [];

      (res?.results || []).forEach((work, i) => {
        (
          work.works[0]?.child_templates?.map(
            (child_template) => child_template?.fields
          ) || []
        ).map((childTemplates) => {
          childTemplates.map((field) => worksForUpload[i].push(field));
        });
      });
      setData(worksForUpload);
      setTemplateNames(initialTemplateNames);
      if (data.length) uploadWorks(data, shownFields, templateNames);
      setUploadLoading(false);
    } catch (e) {
      console.error('Ошибка загрузки работ:', e);
    }
  };

  return {
    fetchAndUploadWorks,
    uploadLoading,
  };
};

export default useUploadWorks;
