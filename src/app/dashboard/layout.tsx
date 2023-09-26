import './index.scss'
import { Montserrat } from 'next/font/google'
import { NAVLINK_MENU_LIST } from '@/constans/navLinkMenuItems'
import NavLink from './NavLink'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <main className="dashboard-container">
          <section className="sidebar">
            <nav>
              <ul>
                {NAVLINK_MENU_LIST.map((navLink) => (
                  <li key={navLink.href}>
                    <NavLink href={navLink.href} segment={navLink.segment}>
                      {navLink.name}
                    </NavLink>
                    {navLink.collection && (
                      <ul>
                        {navLink.collection.map((navLink) => (
                          <li key={navLink.href}>
                            <NavLink href={navLink.href}>
                              {navLink.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </section>
          <div className="content">{children}</div>
        </main>
      </body>
    </html>
  )
}
