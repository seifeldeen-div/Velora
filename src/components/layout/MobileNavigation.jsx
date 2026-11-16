import { Link } from 'react-router-dom'

/** @param {{ open: boolean, links: { to: string, label: string }[], label: string, onNavigate: () => void }} props */
function MobileNavigation({ open, links, label, onNavigate }) {
  return (
    <nav
      id="mobile-navigation"
      className="mobile-navigation"
      aria-label={label}
      hidden={!open}
    >
      {links.map((link) => (
        <Link key={link.to} to={link.to} onClick={onNavigate}>
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

export default MobileNavigation
