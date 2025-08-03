import styles from "@/styles/Hero.module.css";
import logo from "@img/cannabio-logo.jpg";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="inicio" className={styles.hero}>
      <video autoPlay loop muted playsInline className={styles.videoBackground}>
        <source src="/videos/fondo-hero.mp4" type="video/mp4" />
        Tu navegador no soporta videos en HTML5.
      </video>

      <div className={styles.overlay}>
        <div className={styles.content}>
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className={styles.logoContainer}
          >
            <img
              src={logo}
              alt="CannaBIO"
              className={styles.logoImage}
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: "easeOut",
            }}
            className={styles.title}
          >CannaBIO</motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: "easeOut",
            }}
            className={styles.subtitle}
          >
            Nos dedicamos al cultivo de Cannabis no psicoactivo para uso
            medicinal e industrial. Proveemos biomasa de cáñamo, flores con alto contenido de CBD, extractos y producto terminado. Contamos con una biofábrica para el desarrollo de sustratos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: "easeOut",
            }}
          >
            <motion.a
              href="#contacto"
              className={styles.cta}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ¡Contáctanos!
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
