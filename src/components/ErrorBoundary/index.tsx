import React, { ReactNode } from 'react';
import Button from 'components/Button';
import Exception from 'components/Exception';
import withRouter, { RouterProps } from 'components/withRouter';

interface Props extends RouterProps {
  children?: ReactNode;
}

class ErrorBoundary extends React.Component<Props> {
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

  reset = () => {
    this.setState({
      error: false,
    });

    this.props.router.navigate('/', { replace: true });
  };

  render() {
    if (this.state.error) {
      return (
        <Exception>
          <Button variant='text' icon='replay' onClick={this.reset}>
            Back
          </Button>
        </Exception>
      );
    }

    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
