/**
 * Tipos globales adicionales.
 * - Define interfaces para componentes universitarios.
 * - Extiende tipos principales para navegación y props.
 */
interface UniversidadesProps {
  onNavigate: (view: CurrentView, universityId?: string) => void;
}
