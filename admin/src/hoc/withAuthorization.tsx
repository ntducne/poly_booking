import React from 'react';
import { Navigate } from 'react-router-dom';
import { cookies } from '../config/cookies';

const withAuthorization = (WrappedComponent : any, requiredPermission : any) => {
  return function WithAuthorization(props :any) {
    const permissions = JSON.parse(cookies().Get('AuthUser') as any)[3];
    console.log(permissions, "permissions");
    if (!permissions || !permissions.includes(requiredPermission)) {
      return <Navigate to="/403" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthorization;