export const NAVLINK_MENU_LIST = [
  {
    name: 'Panel de control',
    href: '/dashboard',
    segment: 'dashboard',
  },
  {
    name: 'Cotizaciones ',
    href: '',
    segment: 'quotes',
    collection: [
      {
        name: 'Solicitudes',
        href: '/dashboard/quotes/requests',
      },
      {
        name: 'Registros',
        href: '/dashboard/quotes/records',
      },
    ],
  },
  {
    name: 'certificados',
    href: '/dashboard/certificates',
    segment: 'certificates',
  },
  {
    name: 'Usuarios',
    href: '/dashboard/users',
    segment: 'users',
  },
  {
    name: 'Actividades',
    href: '/dashboard/activities',
    segment: 'activities',
  },
  {
    name: 'Reportes',
    href: '/dashboard/reports',
    segment: 'reports',
  },
  {
    name: 'Configuración',
    href: '/dashboard/settings',
    segment: 'settings',
  },
]
