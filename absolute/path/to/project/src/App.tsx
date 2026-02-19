import ErrorBoundary from './components/ErrorBoundary';

function AppContent() {
  return (
    <div className="app-container">
      <ErrorBoundary>
        <CalendarioEventos 
          onNavigate={handleNavigate} 
          setSelectedPastEventId={setSelectedPastEventId} 
        />
      </ErrorBoundary>
    </div>
  );
}