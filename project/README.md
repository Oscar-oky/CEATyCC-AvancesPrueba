# Frontend - CEATyCC

## Estructura del Proyecto

```
project/
├── src/
│   ├── assets/         # Recursos estáticos (imágenes, logos)
│   ├── components/     # Componentes React
│   │   ├── Actividades/       # Componentes de actividades
│   │   ├── AreasEstrategicas/ # Componentes de áreas estratégicas
│   │   ├── Contacto/          # Componentes de contacto
│   │   ├── Convenios/         # Componentes de convenios
│   │   ├── layout/            # Componentes de layout (Header, Footer)
│   │   ├── ui/                # Componentes UI reutilizables
│   │   └── ...                # Otros componentes
│   ├── hooks/          # Hooks personalizados
│   ├── styles/         # Estilos globales
│   ├── types/          # Definiciones de tipos TypeScript
│   ├── utils/          # Utilidades y constantes
│   ├── App.tsx         # Componente principal
│   ├── main.tsx        # Punto de entrada
│   └── vite-env.d.ts   # Tipos de Vite
├── database/           # Archivos de base de datos
├── public/             # Archivos públicos
├── .env.development    # Variables de entorno de desarrollo
├── package.json        # Dependencias y scripts
├── tailwind.config.js  # Configuración de Tailwind CSS
├── tsconfig.json       # Configuración de TypeScript
├── vite.config.ts      # Configuración de Vite
└── README.md           # Documentación del proyecto
```

## Variables de Entorno

```
VITE_APP_BASE_URL=http://localhost:5001
```

## Scripts Principales

| Script | Descripción                          |
|--------|--------------------------------------|
| dev    | Iniciar servidor de desarrollo       |
| build  | Construir para producción            |
| lint   | Ejecutar ESLint                      |
| preview| Previsualizar build de producción    |

## Instalación y Ejecución

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Configurar variables de entorno en `.env.development`

3. Ejecutar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Construir para producción:
   ```bash
   npm run build
   ```

## Tecnologías Utilizadas

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Framer Motion
- html5-qrcode
- qrcode.react
- Leaflet (mapas)
- React Google Maps API

## Componentes Principales

### Layout
- `Header.tsx`: Encabezado de la aplicación
- `Footer.tsx`: Pie de página
- `Navigation.tsx`: Navegación principal

### Páginas
- `Home`: Página principal con carrusel, calendario y tarjetas de información
- `CalendarioEventos`: Calendario interactivo de eventos
- `EventosPasados`: Lista de eventos pasados
- `EventosProximos`: Lista de eventos próximos
- `Contacto`: Formulario de contacto
- `Profile`: Perfil de usuario
- `Scanner`: Escáner de QR para asistencia

### Hooks Personalizados
- `AuthContext`: Gestión de autenticación
- `useEvents`: Gestión de eventos
- `useRegistrations`: Gestión de inscripciones
- `useFileUpload`: Gestión de subida de archivos

## Rutas de la Aplicación

| Ruta                        | Componente                          |
|-----------------------------|-------------------------------------|
| /                           | Página Principal                    |
| /committee                  | Directorio del Comité               |
| /mision-vision-objetivo     | Misión, Visión y Objetivos          |
| /organizacion-estructura    | Organización y Estructura           |
| /calendario-eventos         | Calendario de Eventos               |
| /eventos-pasados            | Eventos Pasados                     |
| /eventos-proximos           | Eventos Próximos                    |
| /contacto                   | Contacto                            |
| /capacitacion               | Capacitación                        |
| /microcredenciales          | Microcredenciales                   |
| /open-academy-santander     | Open Academy Santander              |
| /reconocimientos            | Reconocimientos                     |
| /universidades              | Universidades Afiliadas             |
| /perfil                     | Perfil de Usuario                   |
| /scanner                    | Escáner de QR                       |
| /torneo-programacion-basica | Torneo de Programación Básica       |
| /torneo-programacion-avanzado | Torneo de Programación Avanzada |
| /torneo-hacking-ctf         | Torneo de Hacking CTF               |
| /concurso-carteles          | Concurso de Carteles Científicos    |

## Estructura de Datos

### Evento
```typescript
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  times: string[];
  location: string;
  photos: string[];
  videos: string[];
  documents: string[];
  mainPhoto: string;
  category: string;
  registrationLink?: string;
  publicationDate: string;
}
```

### Usuario
```typescript
interface User {
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'blocked';
}
```

## Desarrollo

### Reglas de Código
- Usar TypeScript para todos los archivos
- Seguir las convenciones de nombres de React
- Usar Tailwind CSS para estilos
- Implementar hooks personalizados para lógica reutilizable
- Manejar errores con ErrorBoundary

### Optimización
- Usar React.memo para componentes que renderizan frecuentemente
- Usar useMemo y useCallback para optimizar cálculos y funciones
- Implementar lazy loading para componentes grandes
- Optimizar imágenes y recursos estáticos
