// src/components/Footer.tsx
/* import { useEffect, useState } from 'react';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  // Opcional: actualizar año automáticamente si el año cambia (en teoría no necesario, pero queda listo)
  useEffect(() => {
    const timer = setInterval(() => {
      const currentYear = new Date().getFullYear();
      if (currentYear !== year) setYear(currentYear);
    }, 1000 * 60 * 60 * 24); // check diario
    return () => clearInterval(timer);
  }, [year]);

  return (
    <footer className={styles.mainFooter}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <p className={styles.footerCopyright}>
            &copy; {year} CannaBio. Todos los derechos reservados.
          </p>
          <address className={styles.footerContact}>
            <a href="mailto:info@taperainvisible.com" className={styles.footerLink}>
              info@cannabio.com
            </a>
            <a href="tel:+1234567890" className={styles.footerLink}>
              +1 234 567 890
            </a>
          </address>
        </div>
      </div>
    </footer>
  );
};

export default Footer; */
import { useEffect, useState } from 'react';
import styles from '../styles/Footer.module.css';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const timer = setInterval(() => {
      const currentYear = new Date().getFullYear();
      if (currentYear !== year) setYear(currentYear);
    }, 1000 * 60 * 60 * 24);
    return () => clearInterval(timer);
  }, [year]);

  return (
    <footer className={styles.mainFooter}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <p className={styles.footerCopyright}>
            &copy; {year} CannaBio. Todos los derechos reservados.
          </p>
          
          <div className={styles.socialLinks}>
            {/* Enlace a Instagram */}
            <a 
              href="https://www.instagram.com/cannabio_uy" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Instagram"
            >
              <FaInstagram className={styles.socialIcon} />
              Instagram
            </a>
            
            {/* Botón de WhatsApp */}
            <a 
              href="https://wa.me/1234567890" // Reemplaza con tu número (sin +)
              target="_blank" 
              rel="noopener noreferrer"
              className={`${styles.socialLink} ${styles.whatsappLink}`}
              aria-label="WhatsApp"
            >
              <FaWhatsapp className={styles.socialIcon} />
              WhatsApp
            </a>
          </div>
          
          <address className={styles.footerContact}>
            <a href="mailto:info@cannabio.com" className={styles.footerLink}>
              info@cannabio.com
            </a>
            <a href="tel:+1234567890" className={styles.footerLink}>
              +1 234 567 890
            </a>
          </address>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
