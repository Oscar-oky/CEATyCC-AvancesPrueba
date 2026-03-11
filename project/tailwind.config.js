/**
 * Configuración de Tailwind CSS.
 * - Define rutas de contenido para escaneo de clases.
 * - Animación personalizada 'scroll' para carruseles.
 * - Extiende tema base con keyframes personalizados.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'scroll': 'scroll 20s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-200px * 4))' },
        }
      }
    },
  },
  plugins: [],
};