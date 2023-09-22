import { user } from './api'

const adminApi = () => {
    const fetchRole = async (): Promise<any> => {
        return await user.get('profile')
    }
    const createRole = async (): Promise<any> => {
        return await user.get('orders')
    }
    const fetchPermission = async (): Promise<any> => {
        return await user.get('orders')
    }
    const assignPermisionToRole = async (): Promise<any> => {
        return await user.post('checkout')
    }
    const assignPermisionToUser = async (): Promise<any> => {
        return await user.put('update')
    }
    const assignRoleToUser = async (): Promise<any> => {
        return await user.put('update')
    }
  
    return { 
        fetchRole, 
        createRole, 
        fetchPermission, 
        assignPermisionToRole, 
        assignPermisionToUser, 
        assignRoleToUser 
    }
}


export { adminApi }