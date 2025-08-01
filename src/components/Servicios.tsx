
import { FaLeaf, FaShippingFast, FaHandsHelping, FaMicroscope, FaSolarPanel, FaRegChartBar } from 'react-icons/fa';
import {  GiReceiveMoney } from 'react-icons/gi';
import { motion } from 'framer-motion';
import styles from '../styles/Servicios.module.css';

const servicios = [
  {
    id: 1,
    titulo: 'Cultivo y Biomasa',
    descripcion: 'Producción de biomasa de cáñamo, flores con alto contenido de CBD. Cumpliendo con normativas sanitarias y de trazabilidad.',
    icon: <FaLeaf />,
  },

  {
    id: 2,
    titulo: 'Exportación y Logística',
    descripcion: 'Gestionamos el transporte y la documentación para exportar cannabis a mercados internacionales.',
    icon: <FaShippingFast />,
  },
  {
    id: 3,
    titulo: 'Asesoramiento Técnico',
    descripcion: 'Acompañamiento legal, agronómico y normativo desde la planificación hasta la operación.',
    icon: <FaHandsHelping />,
  },
  {
    id: 4,
    titulo: 'Control de Calidad',
    descripcion: 'Análisis de laboratorio, verificación de cannabinoides y control microbiológico certificados.',
    icon: <FaMicroscope />,
  },
  {
    id: 5,
    titulo: 'Energía y Sustentabilidad',
    descripcion: 'Soluciones energéticas limpias para un cultivo más eficiente y respetuoso con el ambiente.',
    icon: <FaSolarPanel />,
  },
  {
    id: 6,
    titulo: 'Análisis de Rentabilidad',
    descripcion: 'Evaluamos costos, márgenes y retorno esperado para optimizar la inversión en el cultivo sostenible e industrial.',
    icon: <FaRegChartBar />,
  },
  {
    id: 7,    
    titulo: 'Modelos de Financiamiento',
    descripcion: 'Opciones de inversión y acuerdos de colaboración para proyectos de pequeña o gran escala.',
    icon: <GiReceiveMoney />,
  },
];

export default function Servicios() {
  return (
    <section className={styles.servicios} id="servicios">
      <h2>Nuestros Servicios</h2>
      <div className={styles.grid}>
        {servicios.map(({ titulo, descripcion, icon }, id) => (
          <motion.article
            className={styles.card}
            key={id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: id * 0.1 }}
          >
            <div className={styles.icon}>{icon}</div>
            <h3>{titulo}</h3>
            <p>{descripcion}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
