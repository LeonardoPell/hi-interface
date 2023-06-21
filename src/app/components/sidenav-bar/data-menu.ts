export var dadosMenu = [
  {
    text: 'Home',
    icon: 'home',
    routerLink: '/menu',
  },
  {
    text: 'Calendário',
    icon: 'calendar_today',
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
    text: 'Financeiro',
    icon: 'attach_money',
    children: [
      {
        text: 'Balancete',
        routerLink: '/financeiro/balancete',
        icon: 'money',
      },
    ]
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
