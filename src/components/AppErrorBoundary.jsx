import { Component } from 'react';
import ErrorPage from './ErrorPage';

export default class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error inesperado en la aplicación:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          code="Error"
          title="Algo salió mal."
          message="Hubo un problema al mostrar esta página. Recarga el navegador o vuelve al inicio para continuar."
        />
      );
    }

    return this.props.children;
  }
}
