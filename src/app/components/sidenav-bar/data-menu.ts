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
        nivelPermissao: [1]
      },
    ],
  },
  {
    text: 'Evento',
    icon: 'event',
    children: [
      {
        text: 'Eventos',
        routerLink: '/eventos',
        icon: 'event_available',
      },
      {
        text: 'Presença',
        routerLink: '/eventos/relatorio/presenca',
        icon: 'playlist_add_check',
      }
    ]
  },
];
