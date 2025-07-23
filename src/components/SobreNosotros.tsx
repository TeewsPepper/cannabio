import styles from '../styles/SobreNosotros.module.css';

const SobreNosotros = () => {
  return (
    <section id="nosotros" className={styles.aboutSection}>
      <div className={styles.overlay}>
        <h2 className={styles.sectionTitle}>
          Nuestra Experiencia 
        </h2>
        
        {/* Galería de 3 imágenes en una sola fila */}
        <div className={styles.imageRow}>
          <img 
            src="/public/img/cannabio-03.jpg" 
            alt="Cultivo interior controlado" 
            className={styles.rowImage}
          />
          
          <img 
            src="/public/img/cannabio-05.jpg" 
            alt="Laboratorio de análisis de cannabinoides" 
            className={styles.rowImage}
          />
          <img 
            src="/public/img/cannabio-06.jpg" 
            alt="Nuestro equipo de expertos" 
            className={styles.rowImage}
          />
        </div>
        
        <div className={styles.aboutText}>
          <p className={styles.aboutParagraph}>
            Líderes en el <strong><span></span>cultivo sostenible </strong>de cannabis medicinal, combinamos innovación agrícola con rigurosos estándares científicos.
          </p>
          <p className={styles.aboutParagraph}>
            Nuestras instalaciones cuentan con tecnología de punta para el control ambiental y sistemas de trazabilidad avanzados.
          </p>
          <p className={styles.aboutParagraph}>
            Desarrollamos terapias cannabinoides personalizadas con evidencia científica y estrictos protocolos de calidad.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SobreNosotros;