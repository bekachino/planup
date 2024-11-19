export const apiUrl = 'http://10.1.2.52:8000/api';

export const ERROR_MESSAGES = {
  400: 'Неверные данные',
  401: 'Вы не авторизованы!',
  403: 'У вас нет доступа!',
  404: 'Не найдено',
  405: 'Неверный запрос',
  500: 'Ошибка сервера',
};

export const filterCategories = [
  {
    name: 'executerTypes',
    value: 'Исполнитель',
  },
  {
    name: 'resolutionTypes',
    value: 'Резолюция',
  },
  {
    name: 'templateTypes',
    value: 'Шаблон',
  },
  {
    name: 'statusTypes',
    value: 'Состояние',
  },
  {
    name: 'squareTypes',
    value: 'Квадрат',
  },
  {
    name: 'start_date',
    value: 'Дата создания',
  },
  {
    name: 'end_date',
    value: 'Дата завершения',
  },
];
