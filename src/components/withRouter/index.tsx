import React from 'react';
import { ComponentType } from 'react';
import {
  NavigateFunction,
  Params,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

export interface RouterProps {
  router: {
    location: Location;
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
  };
}

function withRouter<T extends RouterProps = RouterProps>(
  Component: ComponentType<T>
) {
  function ComponentWithRouterProp(props: Omit<T, keyof RouterProps>) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();

    return (
      <Component {...(props as T)} router={{ location, navigate, params }} />
    );
  }

  return ComponentWithRouterProp;
}

export default withRouter;
