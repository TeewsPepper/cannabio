/* 

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import styles from '../styles/Formulario.module.css';

type FormValues = {
  nombre: string;
  email: string;
  mensaje: string;
};

const Formulario = () => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [user, setUser] = useState<{ id: string; email: string; name: string; avatar: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: { nombre: '', email: '', mensaje: '' },
    mode: 'onChange',
  });

  // ------------------- SANITIZACIÓN -------------------
  const sanitizeInput = (str: string) =>
    str.trim().replace(/<[^>]*>?/gm, '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // ------------------- FETCH SESIÓN -------------------
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/session`, {
      method: 'GET',
      credentials: 'include', // muy importante para que la cookie se envíe
    })
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) setUser(data.user);
      })
      .catch(err => console.error('Error al verificar sesión:', err));
  }, []);

  // ------------------- SUBMIT FORM -------------------
  const onSubmit = async (data: FormValues) => {
    try {
      setSubmitStatus('idle');

      const sanitizedData = {
        nombre: sanitizeInput(data.nombre),
        email: data.email.trim().toLowerCase(),
        mensaje: sanitizeInput(data.mensaje),
      };

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitizedData),
      });

      if (!response.ok) throw new Error('Error en el envío');

      setSubmitStatus('success');
      reset();
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      console.error('Error al enviar:', error);
      setSubmitStatus('error');
    }
  };

  // ------------------- LOGOUT -------------------
  const handleLogout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) setUser(null);
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  };

  return (
    <section className={styles.formulario} id="contacto">
      <motion.div
        className={styles.contenido}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Contáctanos</h2>


        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            placeholder="Tu nombre"
            aria-invalid={errors.nombre ? 'true' : 'false'}
            aria-describedby="nombreError"
            className={errors.nombre ? styles.errorInput : ''}
            {...register('nombre', {
              required: 'El nombre es obligatorio',
              minLength: { value: 2, message: 'Mínimo 2 caracteres' },
              maxLength: { value: 50, message: 'Máximo 50 caracteres' },
            })}
          />
          {errors.nombre && <p id="nombreError" className={styles.error}>{errors.nombre.message}</p>}

          
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="tucorreo@ejemplo.com"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby="emailError"
            className={errors.email ? styles.errorInput : ''}
            {...register('email', {
              required: 'El email es obligatorio',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email inválido' },
              maxLength: { value: 100, message: 'Máximo 100 caracteres' },
            })}
          />
          {errors.email && <p id="emailError" className={styles.error}>{errors.email.message}</p>}

          
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            placeholder="Escribí tu mensaje"
            rows={4}
            aria-invalid={errors.mensaje ? 'true' : 'false'}
            aria-describedby="mensajeError"
            className={errors.mensaje ? styles.errorInput : ''}
            {...register('mensaje', {
              required: 'El mensaje es obligatorio',
              minLength: { value: 10, message: 'Mínimo 10 caracteres' },
              maxLength: { value: 1000, message: 'Máximo 1000 caracteres' },
            })}
          />
          {errors.mensaje && <p id="mensajeError" className={styles.error}>{errors.mensaje.message}</p>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </button>

          {submitStatus === 'success' && (
            <motion.p className={styles.exito} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              ¡Mensaje enviado con éxito!
            </motion.p>
          )}
          {submitStatus === 'error' && (
            <motion.p className={styles.error} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              Error al enviar. Por favor, intenta nuevamente.
            </motion.p>
          )}
        </form>
      </motion.div>
    </section>
  );
};

export default Formulario;
 */
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

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitizedData),
        credentials: "include",
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



