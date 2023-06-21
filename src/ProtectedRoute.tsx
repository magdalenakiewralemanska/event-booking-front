import { ReactNode } from 'react';
import { ACCESS_TOKEN } from './constants/constants';
import { Navigate } from 'react-router';

interface UnauthorizedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: UnauthorizedRouteProps) => {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return <Navigate to={'/user/login'} replace />;
  }
  return <>{children}</>;
};
