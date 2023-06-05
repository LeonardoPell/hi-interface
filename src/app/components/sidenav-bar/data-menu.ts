export var dadosMenu = [
  {
    text: 'Home',
    icon: 'home',
    routerLink: '/noticias',
  },
  {
    text: 'Cadastros Gerais',
    icon: 'person',
    children: [
      {
        text: 'Usuarios',
        icon: 'people',
        routerLink: '/usuarios',
      },
      {
        text: 'Palavra Semestral',
        icon: 'book',
        routerLink: '/palavra-semestral',
      },
    ],
  },
  {
    text: 'Eventos',
    icon: 'event',
    routerLink: '/eventos',
  },
];
