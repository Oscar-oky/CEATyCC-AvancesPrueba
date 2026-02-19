import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-100 text-red-800">
          <h1 className="text-3xl font-bold mb-4">¡Algo salió mal!</h1>
          <p className="text-lg mb-2">Estamos trabajando para solucionar el problema.</p>
          <p className="text-md">Por favor, intenta recargar la página o contacta al soporte si el problema persiste.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;