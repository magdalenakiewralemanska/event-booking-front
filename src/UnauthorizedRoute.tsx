import { Navigate } from 'react-router';
import { ACCESS_TOKEN } from './constants/constants';
import { ReactNode } from 'react';

interface UnauthorizedRouteProps {
  children: ReactNode;
}

export const UnauthorizedRoute = ({ children }: UnauthorizedRouteProps) => {
  if (localStorage.getItem(ACCESS_TOKEN)) {
    return <Navigate to={'/events'} replace />;
  }
  return <>{children}</>;
};
