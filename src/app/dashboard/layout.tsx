'use client'
import './layout.scss'
import { Montserrat } from 'next/font/google'
import { NAVLINK_MENU_LIST } from '@/constans/navLinkMenuItems'
import NavLink from './NavLink'
import Image from 'next/image'
import metrocalLogo from 'public/metrocal.svg'
import vectorIcon from '@/assets/icons/vector.svg'
import notificationIcon from '@/assets/icons/notification.svg'
import { CButton } from '@/components/CButton'
import { ReduxProvider } from '@/redux/providers'
import { Toaster } from 'sonner'
import { getCookie } from 'cookies-next'
import { CSheet } from '@/components/Sheet/inde'
import { Profile } from './ComponentLayout/Profile'
import { QuoteRequest } from './ComponentLayout/quoteRequest'
import menuLinesIcon from '@/assets/icons/menu-lines.svg'
import { useState } from 'react'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [openMenu, setOpenMenu] = useState(false)

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu)
  }

  return (
    <html lang="en">
      <body className={montserrat.className}>
        <main className="dashboard-container">
          <section className={`sidebar ${openMenu && 'open-sidebar'}`}>
            <div className="logo">
              <h3>Metrocal</h3>

              {/* close menu */}
              <div className="close_menu" onClick={handleOpenMenu}>
                <Image src={menuLinesIcon} alt="Menu" width={24} height={24} />
              </div>
            </div>
            <nav>
              {
                <RenderNavLinkByCategory
                  category="organización"
                  list={NAVLINK_MENU_LIST}
                />
              }
              {
                <RenderNavLinkByCategory
                  category="descripción general"
                  list={NAVLINK_MENU_LIST}
                />
              }
            </nav>
          </section>
          <div className="content">
            <header className="header">
              <div className="open_menu" onClick={handleOpenMenu}>
                <Image src={menuLinesIcon} alt="Menu" width={24} height={24} />
              </div>

              <div className="hello">
                <h4>
                  Bienvenid@ <span>{getCookie('username')}</span>
                </h4>
              </div>

              <div className="user">
                <div className="quote">
                  <CSheet
                    position="top"
                    styles={{
                      width: 'fit-content',
                      margin: '0 auto',
                    }}
                    title="Solicitar cotización"
                    description="Escribe el correo electronico o nombre de la empresa del cliente para solicitar una cotización."
                    Component={<QuoteRequest />}
                  >
                    <CButton
                      style={{
                        boxShadow: 'none',
                      }}
                    >
                      <span>+</span>{' '}
                      <span className="quote-text">Solicitar cotización</span>
                    </CButton>
                  </CSheet>
                </div>
                <div className="notification" data-badge="+9">
                  <Image src={notificationIcon} alt="Notification" />
                </div>
                <div className="profile">
                  <CSheet
                    title="Edita tu perfil"
                    description="Haz cambios en tu perfil aquí. Haz clic en guardar cuando hayas terminado."
                    Component={<Profile />}
                  >
                    <div className="flex gap-2 justify-center items-center">
                      <Image src={metrocalLogo} alt="Profile" />
                      <span className="name-userfont-bold">
                        {getCookie('username')?.split(' ')[0]}
                      </span>
                    </div>
                  </CSheet>
                </div>
              </div>
            </header>
            <section className="content-container">
              <ReduxProvider>{children}</ReduxProvider>
            </section>
          </div>
        </main>

        {/* richColor for colored toast*/}
        <Toaster expand={true} richColors={true} />
      </body>
    </html>
  )
}

const RenderNavLinkByCategory = ({
  category,
  list,
}: {
  category: string
  list: any
}) => {
  return (
    <div className="nav-links">
      <h4>{category}</h4>

      <ul className="nav-links-list">
        {list.map(
          (navLink: any) =>
            navLink.category === category && (
              <li
                key={navLink.href}
                className={navLink.collection && 'collection'}
                data-collection-height={
                  navLink.collection && navLink.collection.length
                }
              >
                <NavLink href={navLink.href} segment={navLink.segment}>
                  <Image src={navLink.icon} alt={navLink.name} />
                  {navLink.name}

                  {navLink.collection && (
                    <Image
                      src={vectorIcon}
                      alt="Vector"
                      className="vector-icon"
                    />
                  )}
                </NavLink>
                {navLink.collection && (
                  <ul className="nav-links-list-collection">
                    {navLink.collection.map((navLink: any) => (
                      <li key={navLink.href}>
                        <NavLink href={navLink.href}>{navLink.name}</NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ),
        )}
      </ul>
    </div>
  )
}
