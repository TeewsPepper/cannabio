
import styles from '../styles/Formulario.module.css';
import { motion } from 'framer-motion';

const Formulario = () => {
  return (
    <section className={styles.formulario} id="contacto">
      <motion.div className={styles.contenido} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h2>Contactanos</h2>
        <form>
          <input type="text" placeholder="Nombre" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Tu mensaje" required />
          <button type="submit">Enviar</button>
        </form>
      </motion.div>
    </section>
  );
};

export default Formulario;