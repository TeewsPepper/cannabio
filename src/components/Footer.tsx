/* import styles from "../styles/Footer.module.css";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

interface FooterProps {
  onTogglePoliticas: () => void;
}

const Footer = ({ onTogglePoliticas }: FooterProps) => {
  return (
    <footer className={styles.mainFooter}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <p className={styles.footerCopyright}>
            &copy; {new Date().getFullYear()} CannaBIO. Todos los derechos reservados.
          </p>

          <div className={styles.socialLinks}>
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

            <a
              href="https://wa.me/1234567890" // reemplaza con tu número real sin "+"
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
            <a href="mailto:info@cannabiouy.com" className={styles.footerLink}>
              info@cannabiouy.com
            </a>
          </address>

          <button
            onClick={onTogglePoliticas}
            className={styles.politicaBtn}
            aria-haspopup="dialog"
          >
            Política de privacidad
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

 */
import styles from "../styles/Footer.module.css";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

interface FooterProps {
  onTogglePoliticas: () => void;
}

const Footer = ({ onTogglePoliticas }: FooterProps) => {
  return (
    <footer className={styles.mainFooter}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <p className={styles.footerCopyright}>
            &copy; {new Date().getFullYear()} CannaBIO. Todos los derechos reservados.
          </p>

          <div className={styles.socialLinks}>
            {/* Enlaces externos usan <a> */}
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

            <a
              href="https://wa.me/1234567890" // reemplaza con tu número real sin "+"
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
            <a href="mailto:info@cannabiouy.com" className={styles.footerLink}>
              info@cannabiouy.com
            </a>
          </address>

          {/* Enlace interno usa Link */}
          <Link to="/transmision"  className={`${styles.footerLink} ${styles.transmisionLink}`}>
            Transmisión privada
          </Link>

          <button
            onClick={onTogglePoliticas}
            className={styles.politicaBtn}
            aria-haspopup="dialog"
          >
            Política de privacidad
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
