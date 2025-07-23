import { useState } from 'react'
import { Turn as Hamburger } from 'hamburger-react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '../styles/Header.module.css'

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Sobre Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' }
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo_container}>
        <h1 className={styles.logo}>CannaBIO</h1>
        <p>Cannabis Orgánico Medicinal</p>

        </div>
        <nav className={styles.desktopNav}>
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.mobileMenuBtn}>
          <Hamburger toggled={isOpen} toggle={setIsOpen} size={24} color="#fff" />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileNav}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: -0, opacity: .9 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={styles.mobileNavLink}
                onClick={handleLinkClick}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
