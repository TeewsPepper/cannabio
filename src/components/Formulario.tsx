
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence } from "framer-motion";
import FormMessage from "./FormMessage";
import styles from "../styles/Formulario.module.css";

type FormValues = {
  nombre: string;
  email: string;
  mensaje: string;
};

const Formulario = () => {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "warning">("idle");
  const [rateLimitMessage, setRateLimitMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: { nombre: "", email: "", mensaje: "" },
    mode: "onChange",
  });

  const sanitizeInput = (str: string) =>
    str.trim().replace(/<[^>]*>?/gm, "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const onSubmit = async (data: FormValues) => {
    try {
      setSubmitStatus("idle");

      const sanitizedData = {
        nombre: sanitizeInput(data.nombre),
        email: data.email.trim().toLowerCase(),
        mensaje: sanitizeInput(data.mensaje),
      };

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/send-email`, {/* 7777 */
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(sanitizedData),
      });

      if (response.status === 429) {
        setRateLimitMessage("Demasiadas solicitudes, intenta nuevamente más tarde.");
        setSubmitStatus("warning");
        setTimeout(() => setSubmitStatus("idle"), 3000);
        return;
      }

      if (!response.ok) throw new Error("Error en el envío");

      setSubmitStatus("success");
      reset();
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch (error) {
      console.error("Error al enviar:", error);
      setSubmitStatus("error");
    }
  };

  return (
    <section className={styles.formulario} id="contacto">
      <div className={styles.contenido}>
        <h2>Contáctanos</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Nombre */}
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            placeholder="Tu nombre"
            className={errors.nombre ? styles.errorInput : ""}
            {...register("nombre", {
              required: "El nombre es obligatorio",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
              maxLength: { value: 50, message: "Máximo 50 caracteres" },
            })}
          />
          <AnimatePresence>
            {errors.nombre && <FormMessage type="error" message={errors.nombre.message || ""} />}
          </AnimatePresence>

          {/* Email */}
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="tucorreo@ejemplo.com"
            className={errors.email ? styles.errorInput : ""}
            {...register("email", {
              required: "El email es obligatorio",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido" },
              maxLength: { value: 100, message: "Máximo 100 caracteres" },
            })}
          />
          <AnimatePresence>
            {errors.email && <FormMessage type="error" message={errors.email.message || ""} />}
          </AnimatePresence>

          {/* Mensaje */}
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            placeholder="Escribí tu mensaje"
            rows={4}
            className={errors.mensaje ? styles.errorInput : ""}
            {...register("mensaje", {
              required: "El mensaje es obligatorio",
              minLength: { value: 10, message: "Mínimo 10 caracteres" },
              maxLength: { value: 1000, message: "Máximo 1000 caracteres" },
            })}
          />
          <AnimatePresence>
            {errors.mensaje && <FormMessage type="error" message={errors.mensaje.message || ""} />}
          </AnimatePresence>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>

          <AnimatePresence>
            {submitStatus === "success" && <FormMessage type="success" message="¡Mensaje enviado con éxito!" />}
            {submitStatus === "error" && <FormMessage type="error" message="Error al enviar. Por favor, intenta nuevamente." />}
            {submitStatus === "warning" && <FormMessage type="warning" message={rateLimitMessage} />}
          </AnimatePresence>
        </form>
      </div>
    </section>
  );
};

export default Formulario;



