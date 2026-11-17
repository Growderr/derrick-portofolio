import { NavLink } from 'react-router-dom'
import MoreMenu from '@/components/navigation/MoreMenu'
import { primaryNav } from '@/data/routes'

/**
 * Active link gets a static yellow marker bar.
 * NavLink also sets aria-current="page" on the active item.
 */
export default function DesktopNav() {
  return (
    <nav aria-label="Utama" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {primaryNav.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className="relative block px-3 py-2 text-[0.9375rem] font-medium"
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span aria-hidden="true" className="absolute inset-x-2 bottom-1.5 h-2.5 bg-accent" />
                  )}
                  <span className="relative">{item.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
        <li>
          <MoreMenu />
        </li>
      </ul>
    </nav>
  )
}
