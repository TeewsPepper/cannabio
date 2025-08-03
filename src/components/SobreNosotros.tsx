import styles from '@/styles/SobreNosotros.module.css';
import cannabioTres from '@img/cannabio-03.jpg';
import cannabioCinco from '@img/cannabio-05.jpg';
import cannabioSeis from '@img/cannabio-06.jpg';

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
            src={cannabioTres} 
            alt="Cultivo interior controlado" 
            className={styles.rowImage}
          />
          
          <img 
            src={cannabioCinco} 
            alt="Laboratorio de análisis de cannabinoides" 
            className={styles.rowImage}
          />
          <img 
            src={cannabioSeis} 
            alt="Nuestro equipo de expertos" 
            className={styles.rowImage}
          />
        </div>
        
        <div className={styles.aboutText}>
          <p className={styles.aboutParagraph}>
            Líderes en el <strong>cultivo sostenible</strong> de cannabis medicinal, combinamos <strong>innovación agrícola</strong> con rigurosos estándares científicos.
          </p>
          <p className={styles.aboutParagraph}>
            Nuestras instalaciones cuentan con <strong>tecnología de punta</strong> para el control ambiental y sistemas de trazabilidad avanzados.
          </p>
          
        </div>
      </div>
    </section>
  );
};

export default SobreNosotros;