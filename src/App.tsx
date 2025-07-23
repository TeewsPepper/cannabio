
import Header from './components/Header';
import Hero from './components/Hero';
import Servicios from './components/Servicios';
import SobreNosotros from './components/SobreNosotros';
import Formulario from './components/Formulario';
import styles from './styles/globals.module.css';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <main>
        <Hero />
         <Servicios />
         
        <SobreNosotros />
        
        <Formulario /> 
      </main>
      <Footer />
    </div>
  );
};

export default App;
