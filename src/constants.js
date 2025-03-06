import { ReactComponent as StartedIcon } from './assets/started.svg';
import { ReactComponent as PlannedIcon } from './assets/planned.svg';
import { ReactComponent as StoppedIcon } from './assets/stopped.svg';
import { ReactComponent as OnWayIcon } from './assets/on-way.svg';
import { ReactComponent as FinishedIcon } from './assets/finished.svg';

export const API_URL = 'https://pp.skynet.kg/api';

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
    name: 'userTypes',
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
    name: 'workTypes',
    value: 'Вид работ',
  },
  {
    name: 'statusTypes',
    value: 'Статус',
  },
  {
    name: 'squareTypes',
    value: 'Квадрат',
  },
  {
    name: 'finished',
    value: 'Завершенные',
  },
  {
    name: 'created_date',
    value: 'По дате создания',
  },
  {
    name: 'desired_date',
    value: 'По желаемой дате приезда',
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

export const ROLES = {
  chief: 'Начальник участка',
  engineer: 'Сервисный инженер',
  admin: 'Администратор',
  office: 'Офисник',
  captain: 'Капитан сервис инженеров',
};

export const ROLES_ARRAY = [
  {
    id: 'chief',
    value: 'Начальник участка',
  },
  {
    id: 'engineer',
    value: 'Сервисный инженер',
  },
  {
    id: 'admin',
    value: 'Администратор',
  },
  {
    id: 'office',
    value: 'Офисник',
  },
  {
    id: 'captain',
    value: 'Капитан сервис инженеров',
  },
];

export const DATE_FIELDS = ['Дата создания', 'Дата закрытия'];
export const REQUIRED_WORKS_LIST_FIELDS = [
  'Номер наряда',
  'Битрикс ID',
  'Шаблон',
  'Статус',
  'Дата создания',
  'Дата закрытия',
];

export const DATA_TYPES = {
  text: 'text',
  int: 'number',
  datetime: 'datetime',
  file: 'file',
  url: 'file',
  list: 'list',
  deal_type: 'deal_type',
  crm_contact: 'crm_contact',
};
