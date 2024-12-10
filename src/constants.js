import { ReactComponent as StartedIcon } from './assets/started.svg';
import { ReactComponent as PlannedIcon } from './assets/planned.svg';
import { ReactComponent as StoppedIcon } from './assets/stopped.svg';
import { ReactComponent as OnWayIcon } from './assets/on-way.svg';
import { ReactComponent as FinishedIcon } from './assets/finished.svg';

export const API_URL = 'http://10.1.2.30:8000/api';

export const ERROR_MESSAGES = {
  400: 'Неверные данные',
  401: 'Вы не авторизованы!',
  403: 'У вас нет доступа!',
  404: 'Не найдено',
  405: 'Неверный запрос',
  500: 'Ошибка сервера',
};

export const FILTER_CATEGORIES = [
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

export const STATUS_ICONS = {
  Начат: <StartedIcon />,
  Запланировано: <PlannedIcon />,
  'В пути': <OnWayIcon />,
  Завершен: <FinishedIcon />,
  Приостановить: <StoppedIcon />,
};

export const WORK_STATUSES = {
  Запланировано: 'planned',
  'В пути': 'on-way',
  Начат: 'started',
  Завершен: 'finished',
  Приостановить: 'stopped',
};

export const REGIONS = [
  {
    id: 'Чуй',
    name: 'Чуй',
  },
  {
    id: 'Талас',
    name: 'Талас',
  },
  {
    id: 'Нарын',
    name: 'Нарын',
  },
  {
    id: 'Джалал-Абад',
    name: 'Джалал-Абад',
  },
  {
    id: 'Иссык-Куль',
    name: 'Иссык-Куль',
  },
  {
    id: 'Ош',
    name: 'Ош',
  },
];
