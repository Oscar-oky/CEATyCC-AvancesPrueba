/**
 * Punto de entrada de la aplicación.
 * - Monta React en el elemento #root.
 * - Envuelve la app en StrictMode para detectar patrones problemáticos.
 * - Carga estilos globales y CSS de Leaflet (mapas).
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'leaflet/dist/leaflet.css';

// Renderiza la aplicación dentro del contenedor #root
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
