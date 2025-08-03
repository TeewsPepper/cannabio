import { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import styles from '../styles/Formulario.module.css';

type FormValues = {
  nombre: string;
  email: string;
  mensaje: string;
};

const Formulario = () => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      nombre: '',
      email: '',
      mensaje: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setSubmitStatus('idle');

      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          nombre: data.nombre,
          email: data.email,
          mensaje: data.mensaje,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log('Email enviado:', result.text);
      setSubmitStatus('success');
      reset();

      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      console.error('Error al enviar:', error);
      setSubmitStatus('error');
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
          {/* Campo Nombre */}
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            placeholder="Tu nombre"
            aria-invalid={errors.nombre ? 'true' : 'false'}
            aria-describedby="nombreError"
            className={errors.nombre ? styles.errorInput : ''}
            {...register('nombre', {
              required: 'El nombre es obligatorio',
              minLength: {
                value: 2,
                message: 'Mínimo 2 caracteres',
              },
            })}
          />
          {errors.nombre && (
            <p id="nombreError" className={styles.error}>
              {errors.nombre.message}
            </p>
          )}

          {/* Campo Email */}
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
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Email inválido',
              },
            })}
          />
          {errors.email && (
            <p id="emailError" className={styles.error}>
              {errors.email.message}
            </p>
          )}

          {/* Campo Mensaje */}
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
              minLength: {
                value: 10,
                message: 'Mínimo 10 caracteres',
              },
            })}
          />
          {errors.mensaje && (
            <p id="mensajeError" className={styles.error}>
              {errors.mensaje.message}
            </p>
          )}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </button>

          {/* Mensajes de feedback */}
          {submitStatus === 'success' && (
            <motion.p
              className={styles.exito}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ¡Mensaje enviado con éxito!
            </motion.p>
          )}
          {submitStatus === 'error' && (
            <motion.p
              className={styles.error}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Error al enviar. Por favor, intenta nuevamente.
            </motion.p>
          )}
        </form>
      </motion.div>
    </section>
  );
};

export default Formulario;
