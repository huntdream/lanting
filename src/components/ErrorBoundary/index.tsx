import Exception from 'components/Exception';
import React from 'react';

interface IProps {}

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
