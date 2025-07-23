
import { FaLeaf, FaWarehouse, FaShippingFast, FaHandsHelping, FaMicroscope, FaSolarPanel, FaRegChartBar } from 'react-icons/fa';
import {  GiReceiveMoney } from 'react-icons/gi';
import { motion } from 'framer-motion';
import styles from '../styles/Servicios.module.css';

const servicios = [
  {
    id: 1,
    titulo: 'Cultivo y Biomasa',
    descripcion: 'Producción de biomasa de cannabis medicinal cumpliendo con normativas sanitarias y de trazabilidad.',
    icon: <FaLeaf />,
  },
  {
    id: 2,
    titulo: 'Infraestructura y Equipamiento',
    descripcion: 'Proveemos invernaderos, sistemas de riego, luminarias LED y más para iniciar tu operación.',
    icon: <FaWarehouse />,
  },
  {
    id: 3,
    titulo: 'Exportación y Logística',
    descripcion: 'Gestionamos el transporte y la documentación para exportar cannabis a mercados internacionales.',
    icon: <FaShippingFast />,
  },
  {
    id: 4,
    titulo: 'Asesoramiento Técnico',
    descripcion: 'Acompañamiento legal, agronómico y normativo desde la planificación hasta la operación.',
    icon: <FaHandsHelping />,
  },
  {
    id: 5,
    titulo: 'Control de Calidad',
    descripcion: 'Análisis de laboratorio, verificación de cannabinoides y control microbiológico certificados.',
    icon: <FaMicroscope />,
  },
  {
    id: 6,
    titulo: 'Energía y Sustentabilidad',
    descripcion: 'Soluciones energéticas limpias para un cultivo más eficiente y respetuoso con el ambiente.',
    icon: <FaSolarPanel />,
  },
  {
    id: 7,
    titulo: 'Análisis de Rentabilidad',
    descripcion: 'Evaluamos costos, márgenes y retorno esperado para optimizar tu inversión.',
    icon: <FaRegChartBar />,
  },
  {
    id: 8,    
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
