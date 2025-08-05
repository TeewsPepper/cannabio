import styles from "../styles/SobreNosotros.module.css";
import cannabioTres from "../assets/img/cannabio-03.jpg";
import cannabioCinco from "../assets/img/cannabio-05.jpg";
import cannabioSeis from "../assets/img/cannabio-06.jpg";
import YouTubeEmbed from "./YouTubeEmbed";

const SobreNosotros = () => {
  return (
    <section id="nosotros" className={styles.aboutSection}>
      <div className={styles.overlay}>
        <h2 className={styles.sectionTitle}>Nuestra Experiencia</h2>

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
            Somos una empresa Uruguaya, con{" "}
            <strong>más de 20 años de experiencia</strong> en el cultivo de{" "}
            <strong>
              <a
                href=""
                className={styles.externAnchor}
                target="_blank"
                rel="noopener noreferrer"
              >
                cáñamo para uso medicinal
              </a>
            </strong>{" "}
            e industrial. Innovamos y desarrollamos nuevas técnicas naturales
            para una mayor eficiencia, asegurando una{" "}
            <strong>
              <a
                href="https://rodaleinstitute.org/es/por-qu%C3%A9-org%C3%A1nico/"
                className={styles.externAnchor}
                target="_blank"
                rel="noopener noreferrer"
              >producción sostenible</a>
              , amigable y respetuosa de la naturaleza
            </strong>
            . Estamos comprometidos con el medio ambiente, tomando
            en cuenta la totalidad del ecosistema que nos rodea. Solo así, logramos que
            nuestra producción alcance su{" "}
            <strong>mayor potencial natural</strong>, su{" "}
            <strong>mayor poder curativo</strong> y la capacidad de ofrecer los
            más{" "}
            <strong>
              <a
                className={styles.externAnchor}
                href="https://leafwell.com/es/blog/para-que-se-utiliza-el-canamo"
                target="_blank"
                rel="noopener noreferrer"
              >
                diversos usos y productos
              </a>
            </strong>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default SobreNosotros;
