'use client'
import './layout.scss'
import { Montserrat } from 'next/font/google'
import { NAVLINK_MENU_LIST } from '@/constans/navLinkMenuItems'
import NavLink from './NavLink'
import Image from 'next/image'
import metrocalLogo from 'public/metrocal.svg'
import { ReduxProvider } from '@/redux/providers'
import { Toaster } from 'sonner'
import { getCookie } from 'cookies-next'
import { CSheet } from '@/components/Sheet/inde'
import { Profile } from './ComponentLayout/Profile'
import { QuoteRequest } from './ComponentLayout/quoteRequest'
import menuLinesIcon from '@/assets/icons/menu-lines.svg'
import { useState } from 'react'
import { Modal } from '@/components/Modal'
import { Logout } from './ComponentLayout/Logout'
import { Plus, LogOut, ChevronDown } from 'lucide-react'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [openMenu, setOpenMenu] = useState(false)
  const username = getCookie('username') as string | undefined
  const profileImg = getCookie('profile_img') as string | undefined
  const initials = username?.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase() ?? 'U'

  return (
    <ReduxProvider>
      <html lang="en">
        <body className={montserrat.className}>
          <main className="dashboard-container">

            {/* ── Sidebar ── */}
            <aside className={`sidebar ${openMenu ? 'open-sidebar' : ''}`}>

              {/* Brand */}
              <div className="nav__brand">
                <div className="nav__brand-logo"><span>M</span></div>
                <span className="nav__brand-name">Metrocal</span>
                <button className="nav__brand-close close_menu" onClick={() => setOpenMenu(false)}>
                  <Image src={menuLinesIcon} alt="Cerrar" width={20} height={20} />
                </button>
              </div>

              {/* Nav */}
              <nav className="nav__body">
                <RenderNavLinkByCategory category="organización"       list={NAVLINK_MENU_LIST} />
                <RenderNavLinkByCategory category="descripción general" list={NAVLINK_MENU_LIST} />
              </nav>

              {/* User footer */}
              <div className="nav__footer">
                <div className="nav__user">
                  <div className="nav__user-avatar">
                    {profileImg && profileImg !== 'null' ? (
                      <Image src={profileImg} width={34} height={34} alt="Avatar"
                        style={{ borderRadius: '50%', objectFit: 'cover', width: '34px', height: '34px' }} />
                    ) : (
                      <span>{initials}</span>
                    )}
                  </div>
                  <div className="nav__user-info">
                    <span className="nav__user-name">{username?.split(' ')[0] ?? 'Usuario'}</span>
                    <span className="nav__user-role">Administrador</span>
                  </div>
                  <Modal
                    title="¿Estás seguro de cerrar sesión?"
                    nameButton=""
                    size="sm"
                    Component={() => <Logout />}
                    buttonStyle={{
                      background: 'none', boxShadow: 'none', padding: '0.4rem',
                      borderRadius: '7px', border: '1px solid #f1f5f9',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', color: '#94a3b8', minWidth: 0,
                    }}
                  >
                    <LogOut size={15} color="#dc2626" />
                  </Modal>
                </div>
              </div>
            </aside>

            {/* ── Content ── */}
            <div className="content">
              <header className="header">
                <button className="header__menu-btn open_menu" onClick={() => setOpenMenu(!openMenu)}>
                  <Image src={menuLinesIcon} alt="Menú" width={22} height={22} />
                </button>

                <div className="header__welcome">
                  <span>Bienvenido, </span>
                  <strong>{username?.split(' ')[0] ?? 'Usuario'}</strong>
                </div>

                <div className="header__actions">
                  <CSheet
                    position="top"
                    styles={{ width: 'fit-content', margin: '0 auto' }}
                    title="Solicitar cotización"
                    description="Escribe el correo electrónico o nombre de la empresa del cliente."
                    Component={<QuoteRequest />}
                  >
                    <button className="header__quote-btn">
                      <Plus size={15} />
                      <span className="header__quote-btn-text">Solicitar cotización</span>
                    </button>
                  </CSheet>

                  <CSheet
                    title="Edita tu perfil"
                    description="Haz cambios en tu perfil aquí. Haz clic en guardar cuando hayas terminado."
                    Component={<Profile />}
                  >
                    <div className="header__profile">
                      <div className="header__profile-avatar">
                        {profileImg && profileImg !== 'null' ? (
                          <Image src={profileImg} width={34} height={34} alt="Profile"
                            style={{ borderRadius: '50%', objectFit: 'cover', width: '34px', height: '34px' }} />
                        ) : (
                          <span>{initials}</span>
                        )}
                      </div>
                      <span className="header__profile-name">{username?.split(' ')[0] ?? 'Usuario'}</span>
                    </div>
                  </CSheet>
                </div>
              </header>

              <section className="content-container">{children}</section>
            </div>
          </main>

          <Toaster closeButton expand richColors />
        </body>
      </html>
    </ReduxProvider>
  )
}

/* ── Nav category with click-based accordion ── */
const RenderNavLinkByCategory = ({ category, list }: { category: string; list: any[] }) => {
  const [openCollections, setOpenCollections] = useState<Record<string, boolean>>({})
  const items = list.filter((n) => n.category === category)
  if (!items.length) return null

  const toggle = (key: string) =>
    setOpenCollections((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="nav__section">
      <span className="nav__section-label">{category}</span>
      <ul className="nav__list">
        {items.map((navLink) => {
          const isOpen = !!openCollections[navLink.name]
          return (
            <li key={navLink.href || navLink.name} className="nav__item">

              {navLink.collection ? (
                /* Collection trigger — not a link, just a button */
                <button
                  className="nav__link nav__link--btn"
                  onClick={() => toggle(navLink.name)}
                  aria-expanded={isOpen}
                >
                  <span className="nav__link-icon">
                    <Image src={navLink.icon} alt={navLink.name} width={16} height={16} />
                  </span>
                  <span className="nav__link-text">{navLink.name}</span>
                  <ChevronDown
                    size={14}
                    className={`nav__link-chevron${isOpen ? ' nav__link-chevron--open' : ''}`}
                  />
                </button>
              ) : (
                <NavLink href={navLink.href} segment={navLink.segment}>
                  <span className="nav__link-icon">
                    <Image src={navLink.icon} alt={navLink.name} width={16} height={16} />
                  </span>
                  <span className="nav__link-text">{navLink.name}</span>
                </NavLink>
              )}

              {navLink.collection && isOpen && (
                <ul className="nav__collection">
                  {navLink.collection.map((child: any) => (
                    <li key={child.href} className="nav__collection-item">
                      <NavLink href={child.href}>
                        <span className="nav__collection-dot" />
                        {child.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
