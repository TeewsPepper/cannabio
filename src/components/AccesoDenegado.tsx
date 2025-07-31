import React from "react";
import styles from "../styles/AccesoDenegado.module.css";
import { useNavigate } from "react-router-dom";

const AccesoDenegado: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Acceso denegado</h2>
        <p>No estás autorizado para ver esta transmisión.</p>
        <button onClick={() => navigate("/")}>Volver al inicio</button>
      </div>
    </div>
  );
};

export default AccesoDenegado;
