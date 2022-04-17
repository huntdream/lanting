import Exception from 'components/Exception';
import React, { ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

class ErrorBoundary extends React.Component<IProps> {
  state: Readonly<{ error: boolean }> = {
    error: false,
  };

  static getDerivedStateFromError(error: any) {
    return {
      error: !!error,
    };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return <Exception />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
