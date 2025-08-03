import React from "react";
import styles from "../styles/AccesoDenegado.module.css";

const AccesoDenegado: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2 className={styles.titulo}>Acceso denegado</h2>
        <p className={styles.parrafo}>No estás autorizado para ver esta transmisión.</p>

        <div className={styles.buttons}>
          <a
            href={`${import.meta.env.VITE_BACKEND_URL}/auth/google`}
            className={styles.btnGoogle}
          >
            Iniciar sesión con Google
          </a>

          <button
            className={styles.btnVolver}
            onClick={() => window.location.assign("/")}
            type="button"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccesoDenegado;
