/* import { useEffect, useState } from "react";
import styles from "./styles/Transmision.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import YouTubeEmbed from "./components/YouTubeEmbed";

const camaras = [
  { 
    nombre: "Cam 1", 
    area: "Área de cultivo abierta", 
    estado: "activa",
    videoId: "dQw4w9WgXcQ" // ID de ejemplo, reemplaza con tus IDs reales
  },
  { 
    nombre: "Cam 2", 
    area: "Área de cultivo cerrada", 
    estado: "activa",
    videoId: "dQw4w9WgXcQ"
  },
  { 
    nombre: "Cam 3", 
    area: "Área de secado", 
    estado: "activa",
    videoId: "dQw4w9WgXcQ"
  },
  { 
    nombre: "Cam 4", 
    area: "Área de acopio", 
    estado: "activa",
    videoId: "dQw4w9WgXcQ"
  },
];

const Transmision = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      console.log('🔒 Intentando cerrar sesión...');
      const response = await fetch('http://localhost:3000/auth/logout', {
        credentials: 'include',
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Limpieza completa
      setIsAuthenticated(false);
      localStorage.removeItem('session_token');
      document.cookie.split(';').forEach(c => {
        document.cookie = c.trim().split('=')[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost';
      });
      
      console.log('✅ Sesión cerrada correctamente');
      navigate('/', { replace: true });
    } catch (error) {
      console.error('🔴 Error al cerrar sesión:', error);
      alert('Ocurrió un error al cerrar sesión. Por favor intenta nuevamente.');
    }
  };

  const verifyAuth = async () => {
    const params = new URLSearchParams(location.search);
    
    // 1. Verificar si viene de redirección exitosa
    if (params.get('auth_success') === 'true') {
      console.log('✅ Redirección desde Google exitosa');
      setIsAuthenticated(true);
      navigate('/transmision', { replace: true });
      return;
    }

    // 2. Verificar sesión existente
    try {
      const response = await fetch('http://localhost:3000/api/session', {
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      setIsAuthenticated(data.authenticated);
      
      if (!data.authenticated) {
        console.warn('⚠️ Sesión no válida');
        // Limpieza adicional
        localStorage.removeItem('session_token');
        document.cookie = 'connect.sid=; Max-Age=0; path=/; domain=localhost';
      }
    } catch (error) {
      console.error('🔴 Error de conexión:', error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    
    if (isMounted) {
      verifyAuth();
    }

    return () => {
      isMounted = false;
    };
  }, [location.search, navigate]);

  if (isAuthenticated === null) {
    return <div className={styles.cargando}>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return (
      <main className={styles.transmisionContainer}>
        <h1 className={styles.titulo}>Acceso restringido</h1>
        <p>Debes iniciar sesión con tu cuenta autorizada de Google para acceder.</p>

        <a 
          href="http://localhost:3000/auth/google" 
          className={styles.btnGoogle}
          onClick={(e) => {
            e.preventDefault();
            // Nueva ventana con características controladas
            const authWindow = window.open(
              "http://localhost:3000/auth/google",
              "_blank",
              "width=500,height=600"
            );
            
            // Verificar si la ventana se bloqueó
            if (!authWindow || authWindow.closed || typeof authWindow.closed === 'undefined') {
              alert('El navegador bloqueó la ventana emergente. Por favor permite popups para este sitio.');
            }
          }}
          rel="noopener noreferrer"
        >
          Iniciar sesión con Google
        </a>

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
        >
          Cerrar sesión
        </button>

        <Link to="/">
          <button className={styles.btnVolver}>Volver al inicio</button>
        </Link>
      </div>
    </main>
  );
};

export default Transmision; */
/* import { useEffect, useState } from "react";
import styles from "./styles/Transmision.module.css";
import { Link, useNavigate} from "react-router-dom";
import YouTubeEmbed from "./components/YouTubeEmbed";

const camaras = [
  { 
    nombre: "Cam 1", 
    area: "Área de cultivo abierta", 
    estado: "activa",
    videoId: "dQw4w9WgXcQ" // ID de ejemplo, reemplaza con tus IDs reales
  },
  { 
    nombre: "Cam 2", 
    area: "Área de cultivo cerrada", 
    estado: "activa",
    videoId: "dQw4w9WgXcQ"
  },
  { 
    nombre: "Cam 3", 
    area: "Área de secado", 
    estado: "activa",
    videoId: "dQw4w9WgXcQ"
  },
  { 
    nombre: "Cam 4", 
    area: "Área de acopio", 
    estado: "activa",
    videoId: "dQw4w9WgXcQ"
  },
];

const Transmision = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      console.log('🔒 Intentando cerrar sesión...');
      const response = await fetch('http://localhost:3000/auth/logout', {
        credentials: 'include',
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Limpieza completa
      setIsAuthenticated(false);
      localStorage.removeItem('session_token');
      document.cookie.split(';').forEach(c => {
        document.cookie = c.trim().split('=')[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost';
      });
      
      console.log('✅ Sesión cerrada correctamente');
      navigate('/', { replace: true });
    } catch (error) {
      console.error('🔴 Error al cerrar sesión:', error);
      alert('Ocurrió un error al cerrar sesión. Por favor intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyAuth = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/api/session', {
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      setIsAuthenticated(data.authenticated);
      
      if (!data.authenticated) {
        console.warn('⚠️ Sesión no válida');
        // Limpieza adicional
        localStorage.removeItem('session_token');
        document.cookie = 'connect.sid=; Max-Age=0; path=/; domain=localhost';
      }
    } catch (error) {
      console.error('🔴 Error de conexión:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    // Redirección directa en la misma ventana
    window.location.href = "http://localhost:3000/auth/google";
  };

  useEffect(() => {
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
        <p>Debes iniciar sesión con tu cuenta autorizada de Google para acceder.</p>

        <button 
          onClick={handleLogin}
          className={styles.btnGoogle}
          disabled={isLoading}
        >
          {isLoading ? 'Cargando...' : 'Iniciar sesión con Google'}
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
          {isLoading ? 'Cerrando sesión...' : 'Cerrar sesión'}
        </button>

        <Link to="/">
          <button className={styles.btnVolver}>Volver al inicio</button>
        </Link>
      </div>
    </main>
  );
};

export default Transmision; */
import { useEffect, useState } from "react";
import styles from "./styles/Transmision.module.css";
import { Link, useNavigate } from "react-router-dom";
import YouTubeEmbed from "./components/YouTubeEmbed";

const camaras = [
  { 
    nombre: "Cam 1", 
    area: "Área de cultivo abierta", 
    estado: "activa",
    videoId: "dQw4w9WgXcQ" // ID de ejemplo, reemplaza con tus IDs reales
  },
  { 
    nombre: "Cam 2", 
    area: "Área de cultivo cerrada", 
    estado: "activa",
    videoId: "dQw4w9WgXcQ"
  },
  { 
    nombre: "Cam 3", 
    area: "Área de secado", 
    estado: "activa",
    videoId: "dQw4w9WgXcQ"
  },
  { 
    nombre: "Cam 4", 
    area: "Área de acopio", 
    estado: "activa",
    videoId: "dQw4w9WgXcQ"
  },
];

const Transmision = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/auth/logout', {
        credentials: 'include',
        method: 'POST'
      });

      if (!response.ok) throw new Error('Error al cerrar sesión');

      // Limpieza de estado y cookies
      setIsAuthenticated(false);
      localStorage.removeItem('session_token');
      document.cookie.split(';').forEach(c => {
        document.cookie = c.trim().split('=')[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost';
      });
      
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyAuth = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/api/session', {
        credentials: 'include',
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Error de autenticación');
      
      const data = await response.json();
      setIsAuthenticated(data.authenticated);
      
      if (!data.authenticated) {
        localStorage.removeItem('session_token');
        document.cookie = 'connect.sid=; Max-Age=0; path=/; domain=localhost';
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  useEffect(() => {
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
        <p>Debes iniciar sesión con tu cuenta autorizada de Google para acceder.</p>

        <button 
          onClick={handleLogin}
          className={styles.btnGoogle}
          disabled={isLoading}
        >
          {isLoading ? 'Cargando...' : 'Iniciar sesión con Google'}
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
          {isLoading ? 'Cerrando sesión...' : 'Cerrar sesión'}
        </button>

        <Link to="/">
          <button className={styles.btnVolver}>Volver al inicio</button>
        </Link>
      </div>
    </main>
  );
};

export default Transmision;