import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";
import SobreNosotros from "./components/SobreNosotros";
import Formulario from "@/components/Formulario";
import styles from "@/styles/globals.module.css";
import Footer from "@/components/Footer";
import Politica from "@/components/Politica";


const Home = () => {
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

      <Politica visible={mostrarPoliticas} onClose={togglePoliticas} />

    </div>
  );
};

export default Home;
