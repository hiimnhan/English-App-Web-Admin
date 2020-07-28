const {
  faUniversity,
  faCalculator,
  faUsers,
  faLanguage,
  faQuestionCircle,
} = require('@fortawesome/free-solid-svg-icons');

const mainItemBank = [
  {
    name: 'Banks',
    icon: faUniversity,
    path: '/banks',
  },
  {
    name: 'Calculations',
    icon: faCalculator,
    path: '/calculation',
  },
];

const mainItemEnglish = [
  {
    name: 'Users',
    icon: faUsers,
    path: '/users',
  },
  {
    name: 'Words',
    icon: faLanguage,
    path: '/words',
  },
  {
    name: 'Questions',
    icon: faQuestionCircle,
    path: '/questions',
  },
];

export { mainItemBank, mainItemEnglish };
