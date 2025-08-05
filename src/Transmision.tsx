

import { useEffect, useState } from "react";
import styles from "./styles/Transmision.module.css";
import { Link, useNavigate } from "react-router-dom";
import YouTubeEmbed from "./components/YouTubeEmbed";

const camaras = [
  {
    nombre: "Cam 1",
    area: "Área de cultivo abierta",
    estado: "activa",
    videoId: "dQw4w9WgXcQ", // ID de ejemplo, reemplaza con tus IDs reales
  },
  {
    nombre: "Cam 2",
    area: "Área de cultivo cerrada",
    estado: "activa",
    videoId: "dQw4w9WgXcQ",
  },
  {
    nombre: "Cam 3",
    area: "Área de secado",
    estado: "activa",
    videoId: "dQw4w9WgXcQ",
  },
  {
    nombre: "Cam 4",
    area: "Área de acopio",
    estado: "activa",
    videoId: "dQw4w9WgXcQ",
  },
];

const Transmision = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Uso de variable de entorno para backend (asegúrate que está definida)
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/auth/logout`, {
        credentials: "include",
        method: "POST",
      });

      if (!response.ok) throw new Error("Error al cerrar sesión");

      // Limpieza de estado y cookies
      setIsAuthenticated(false);
      localStorage.removeItem("session_token");
      document.cookie.split(";").forEach((c) => {
        const cookieName = c.trim().split("=")[0];
        if (cookieName === "session") {
          document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
      });

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyAuth = async () => {
    try {
      setIsLoading(true);
      console.log("Verificando autenticación en:", `${BACKEND_URL}/api/session`);
      
      const response = await fetch(`${BACKEND_URL}/api/session`, {
        
        credentials: "include",
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
      });

      console.log("📬 Respuesta HTTP:", response);

      if (!response.ok) throw new Error("Error de autenticación");
      console.warn("⚠️ La respuesta no fue OK. Status:", response.status);

      const data = await response.json();
      console.log("📦 Datos recibidos del backend:", data);
      setIsAuthenticated(data.authenticated);

      if (!data.authenticated) {
        console.warn("⛔ Usuario no autenticado. Limpiando sesión...");
        localStorage.removeItem("session_token");

        document.cookie = "session=; Max-Age=0; path=/;";
      } else {
        console.log("✅ Usuario autenticado correctamente.");
      }
    } catch (error) {
      console.error("Error verificando autenticación:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
      console.log("✅ Verificación de autenticación finalizada.");
    }
  };

  const handleLogin = () => {
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  useEffect(() => {
    console.log("Iniciando verificación de autenticación");
    
    verifyAuth();
  }, []);

  if (isLoading || isAuthenticated === null) {
    return (
      <div className={styles.cargando}>
        <div className={styles.spinner}></div>
        <p>Cargando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className={styles.transmisionContainer}>
        <h1 className={styles.titulo}>Acceso restringido</h1>
        <p>
          Debes iniciar sesión con tu cuenta autorizada de Google para acceder.
        </p>

        <button
          onClick={handleLogin}
          className={styles.btnGoogle}
          disabled={isLoading}
        >
          {isLoading ? "Cargando..." : "Iniciar sesión con Google"}
        </button>

        <Link to="/">
          <button className={styles.btnVolver}>Volver al inicio</button>
        </Link>
      </main>
    );
  }

  return (
    <main className={styles.transmisionContainer}>
      <h1 className={styles.titulo}>Monitor Zone</h1>

      <section className={styles.gridCamaras}>
        {camaras.map((cam, i) => (
          <div key={i} className={styles.camaraCard}>
            <YouTubeEmbed
              videoId={cam.videoId}
              title={`Transmisión en vivo - ${cam.nombre}`}
              className={styles.videoReal}
            />
            <div className={styles.infoCam}>
              <div>
                <strong>{cam.nombre}</strong>
                <br />
                <span>{cam.area}</span>
              </div>
              <div className={styles.estado}>
                <span className={styles.dot}></span>
                <span>{cam.estado}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className={styles.footerButtons}>
        <button
          className={styles.btnLogout}
          onClick={handleLogout}
          aria-label="Cerrar sesión"
          disabled={isLoading}
        >
          {isLoading ? "Cerrando sesión..." : "Cerrar sesión"}
        </button>

        <Link to="/">
          <button className={styles.btnVolver}>Volver al inicio</button>
        </Link>
      </div>
    </main>
  );
};

export default Transmision;
