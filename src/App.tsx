import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Servicios from "./components/Servicios";
import SobreNosotros from "./components/SobreNosotros";
import Formulario from "./components/Formulario";
import styles from "./styles/globals.module.css";
import Footer from "./components/Footer";

const App = () => {
  const [mostrarPoliticas, setMostrarPoliticas] = useState(false);

  const togglePoliticas = () => {
    setMostrarPoliticas((prev) => !prev);
  };

  return (
    <div className={styles.app}>
      <Header />
      <main>
        <Hero />
        <Servicios />
        <SobreNosotros />
        <Formulario />
      </main>

      <Footer onTogglePoliticas={togglePoliticas} />

      {mostrarPoliticas && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="modalTitle">
          <section className={styles.modalContent}>
            <h2 id="modalTitle">Política de privacidad y cookies</h2>
            <p>
              En <strong>CannaBIO Cannabis Medicinal Orgánico e Industrial</strong>, respetamos tu privacidad. Esta página no utiliza cookies para rastrear tu actividad ni utiliza servicios de terceros como Google Analytics. 
              Solo se recaban los datos necesarios (nombre, correo y mensaje) a través del formulario de contacto, los cuales son enviados por EmailJS exclusivamente con fines de respuesta directa. No se almacenan ni 
              comparten dichos datos con terceros.
            </p>
            <p>
              Al utilizar el formulario, aceptás voluntariamente que te contactemos en relación a tu consulta. Si tenés dudas sobre cómo manejamos tus datos, escribinos directamente desde el mismo formulario.
            </p>
            <button onClick={togglePoliticas} className={styles.cerrarBtn} aria-label="Cerrar política de privacidad">
              Cerrar
            </button>
          </section>
        </div>
      )}
    </div>
  );
};

export default App;
