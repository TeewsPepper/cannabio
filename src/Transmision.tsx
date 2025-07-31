import styles from "./styles/Transmision.module.css";
import { Link } from "react-router-dom";

const camaras = [
  { nombre: "Cam 1", area: "Área de cultivo abierta", estado: "activa" },
  { nombre: "Cam 2", area: "Área de cultivo cerrada", estado: "activa" },
  { nombre: "Cam 3", area: "Área de secado", estado: "activa" },
  { nombre: "Cam 4", area: "Área de acopio", estado: "activa" },
];

const Transmision = () => {
  return (
    <main className={styles.transmisionContainer}>
      <h1 className={styles.titulo}>Monitor Zone</h1>
      <section className={styles.gridCamaras}>
        {camaras.map((cam, i) => (
          <div key={i} className={styles.camaraCard}>
            <div className={styles.videoPlaceholder}>
              Simulando {cam.nombre}
            </div>
            <div className={styles.infoCam}>
              <div>
                <strong>{cam.nombre}</strong><br />
                <span>{cam.area}</span>
              </div>
              <div className={styles.estado}>
                <span className={styles.dot}></span>
                <span>{cam.estado}</span>
              </div>
            </div>
          </div>
        ))}
      </section>
      <Link to="/">
        <button className={styles.btnVolver}>Volver al inicio</button>
      </Link>
    </main>
  );
};

export default Transmision;

