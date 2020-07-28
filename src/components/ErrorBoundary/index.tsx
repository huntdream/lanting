import React from 'react';

interface IProps {}

class ErrorBoundary extends React.Component<IProps> {
  static getDerivedStateFromError() {
    return 'Error';
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
