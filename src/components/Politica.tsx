// src/components/Politica.tsx
import styles from '../styles/Politica.module.css';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const Politica = ({ visible, onClose }: Props) => {
  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>✕</button>
        <h2>Política de Privacidad y Cookies</h2>
        <p><strong>1. Responsable del tratamiento de datos</strong><br />
        Los datos enviados a través del formulario de contacto son gestionados por el equipo de CannaBIO exclusivamente con fines de respuesta a la consulta recibida.</p>

        <p><strong>2. Finalidad del tratamiento</strong><br />
        Los datos se utilizan únicamente para responder a mensajes enviados a través del formulario. No se almacenan en bases de datos ni se utilizan para fines publicitarios o de marketing.</p>

        <p><strong>3. Base legal</strong><br />
        El tratamiento de los datos se realiza con base en el consentimiento explícito del usuario al enviar el formulario.</p>

        <p><strong>4. Destinatarios de los datos</strong><br />
        Los datos son enviados mediante el servicio EmailJS directamente a las casillas de correo configuradas por CannaBIO. No se comparten con terceros ni se utilizan con fines distintos a los indicados.</p>

        <p><strong>5. Cookies</strong><br />
        Este sitio no utiliza cookies propias ni de terceros con fines de seguimiento, análisis o marketing. Si en el futuro se implementaran, se notificará al usuario mediante un aviso emergente y se solicitará su consentimiento.</p>

        <p><strong>6. Derechos del usuario</strong><br />
        El usuario puede solicitar el acceso, rectificación o eliminación de sus datos enviando un mensaje a [correo de contacto de CannaBIO].</p>

        <p><strong>7. Cambios en la política</strong><br />
        CannaBIO se reserva el derecho de modificar esta política según evolucione la legislación o el funcionamiento del sitio.</p>
      </div>
    </div>
  );
};

export default Politica;
