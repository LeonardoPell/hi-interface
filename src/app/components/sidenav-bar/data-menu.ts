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
    ],
  },
];
