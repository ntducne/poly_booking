export const permission = () => { 
    const userPermissions = ['admin.booking.index'];
    const checkPermission = (permission: string) => { 
        if(!userPermissions.includes(permission)) { 
            window.location.href = "/403";
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
