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

export const clearFormatPhoneNumber = (value) =>
  `+996${value.replace(/[\s()-]/g, '')}`;

export const uploadWorks = (works, shownFields = []) => {
  const workbook = XLSX.utils.book_new();

  const worksheet = XLSX.utils.json_to_sheet([]);

  let rowIndex = 1;

  const filteredFieldTitles = (works[0] || [])
    .filter((workField) => shownFields.includes(workField?.name))
    .map((workField) => workField.name);

  XLSX.utils.sheet_add_aoa(worksheet, [filteredFieldTitles], { origin: `A1` });

  works.forEach((work) => {
    rowIndex += 1;

    const filteredFields = (work || []).filter((workField) =>
      shownFields.includes(workField?.name)
    );

    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        filteredFields.map((workField) =>
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

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Наряды');
  XLSX.writeFile(workbook, 'Наряды.xlsx');
};
