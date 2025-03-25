import * as XLSX from 'xlsx';
import moment from 'moment';

export const formatPhoneNumber = (value) => {
  const numbersOnly = value.replace(/\D/g, '');

  if (numbersOnly.length <= 3) {
    return numbersOnly;
  } else if (numbersOnly.length <= 6) {
    return `(${numbersOnly.slice(0, 3)}) ${numbersOnly.slice(3)}`;
  } else {
    return `(${numbersOnly.slice(0, 3)}) ${numbersOnly.slice(3, 6)} ${numbersOnly.slice(6, 9)}`;
  }
};

export const clearFormatPhoneNumber = (value) => {
  if (!value) return '';
  return `+996${value.replace(/[\s()-]/g, '')}`;
};

export const uploadWorks = (works, shownFields = []) => {
  const workbook = XLSX.utils.book_new();

  const worksheet = XLSX.utils.json_to_sheet([]);

  let rowIndex = 1;

  XLSX.utils.sheet_add_aoa(worksheet, [[...shownFields, 'Виды работ']], {
    origin: `A1`,
  });

  works.forEach((work) => {
    rowIndex += 1;

    const filteredFields = [];
    const finishedWorkNames = work
      .find((workField) => workField.name === 'Виды работ')
      ?.field_value.map((fieldValueWork) => ({
        field_value: fieldValueWork,
      }));

    shownFields.forEach((field) => {
      const foundWorkField = (work || []).find(
        (workField) => workField.name === field
      );

      if (foundWorkField) filteredFields.push(foundWorkField);
      else
        filteredFields.push({
          name: field,
          field_value: '',
        });
    });

    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [...filteredFields, ...finishedWorkNames].map((workField) =>
          ['Дата создания', 'Дата закрытия'].includes(workField?.name)
            ? !!workField?.field_value
              ? moment(workField?.field_value).format('DD-MM-YYYY HH:mm')
              : ''
            : workField?.field_value || ''
        ),
      ],
      { origin: `A${rowIndex}` }
    );
  });
  
  worksheet['!cols'] = [
    { wch: 10 },
    { wch: 10 },
    { wch: 25 },
    { wch: 10 },
    { wch: 20 },
    { wch: 20 },
    { wch: 15 },
    { wch: 25 },
    { wch: 20 },
  ];

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Наряды');
  XLSX.writeFile(workbook, 'Наряды.xlsx');
};
