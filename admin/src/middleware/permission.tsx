import { cookies } from "../config/cookies"
export const permission = () => { 
    const userPermissions = JSON.parse(cookies().Get('permission') as any);
    if(!userPermissions) {
        window.location.href = '/login';
    }
    const checkPermission = (permission: string) => { 
        if(!userPermissions.includes(permission)) { 
            window.location.href = '/403';
        }
        return true;
    }
    const viewPermission = (permission: string) => {
        if(!userPermissions.includes(permission)) { 
            return false;
        }
        return true;
    }
    return {
        checkPermission,
        viewPermission
    }
}