import { motion } from "framer-motion";
import styles from "../styles/Formulario.module.css";

type FormMessageProps = {
  type: "success" | "error" | "warning";
  message: string;
};

const FormMessage = ({ type, message }: FormMessageProps) => {
  let className = "";
  if (type === "success") className = styles.exito;
  if (type === "error") className = styles.error;
  if (type === "warning") className = styles.warning;

  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
    >
      {message}
    </motion.p>
  );
};

export default FormMessage;


