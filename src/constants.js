export const apiUrl = 'http://10.1.2.117:8000/api';

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
    value: 'Завершенные',
  },
  {
    name: 'end_date',
    value: 'По дате',
  },
];

export const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
