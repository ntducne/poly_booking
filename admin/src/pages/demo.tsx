import { useEffect, useState } from "react"
import { cookies } from "../config/cookies"
import { permission } from "../middleware/permission"
export default function Demo(){
    const [token, setToken] = useState(null as any)
    // permission().checkPermission('category.index')
    const data = {
        "status": true,
        "user": {
            "image": "https://res.cloudinary.com/dteefej4w/image/upload/v1681474078/users/585e4bf3cb11b227491c339a_gtyczj.png",
            "name": "Super Admin"
        },
        "accessToken": {
            "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI2NTI1NjdiMzBlZDFjYzQ5OTQwYTM1MzIiLCJqdGkiOiIwMmRlYzdkZGYzYmMxMWNjY2I5NWFjZmJiNzAyYjhkYjlmYTA4ODUzNDczNzNmOTliYWY0ZjdkN2JlMzEyMmRlMWQ3N2I4NzFiOGU3YjU0MSIsImlhdCI6MTY5NzAzMDQ1MC40ODUzNTIsIm5iZiI6MTY5NzAzMDQ1MC40ODUzNTYsImV4cCI6MTcyODY1Mjg1MC40NDgwNCwic3ViIjoiNjUyMmM4YjkyNWY2OWFlMjU1MDJlMDg0Iiwic2NvcGVzIjpbImFkbWluIl19.zfC2iz0TitkE91DRQGU3aTRf-5cPSVyWPbN0uFXJgxmEnouHrAMgs1sKlHobS2G0jX2-kjHYEmC1CIDyCj_jS9DobucoLh9P-tJwvj69G0Ml1Nl9L1rQETpns2OoSzEq-EQKZ0dUVZYEfjOXWAEReJRha73oQy0WmMAU5PREW76Iq80-pV861xeu0VFDLp7kchWXMcc8yy88saXjuJnl4kv-CWh62TN-6awrDYqGD-NT6VyhUw_3aSIqFw1uVQpu6KnE5Go4UKj-mGxZFai3GVYQuA9fiIcmAgzYXkaQMJ-wLb5rxHDeF7iYxxna_8h5jGKTblwqreEo4pSq-x4g-r_vAaADlYc29yBs2CeljzO16fC4OKF02xEORJc9lRnbcsu240YTh6uV10pafFxETFZzdGHrjM7BQN9M36TqXuIPeSXGCyPG76JvjgGhlfhX57hQna7rYRzr5qZnh3Fg7gyY0POgOuhxSf9k8nD231wB0oV2fBpP2Hp07EJBZwwhstzMyRoUF4pFIkrbjiDx30uQg453oTcGeIpN8YJZ0Sjsf-6X7DK-uIrQ_27aFcm9xIi9AXOfmzeh5jTWzCYEnmnLvTdp-aEruz4pVxEgPlVaYJl147zyNkDyIaiSiHtAkeprPUpK2lZWjgQfpF7nevkGv9nOSfYGKKl3dejWqUk",
            "expires_at": "2024-10-11 20:20:50"
        },
        "permission": [
            "admin.branches.index",
            "admin.branches.create",
            "admin.branches.store",
            "admin.branches.show",
            "admin.branches.edit",
            "admin.branches.update",
            "admin.branches.destroy",
            "admin.utilities.index",
            "admin.utilities.create",
            "admin.utilities.store",
            "admin.utilities.show",
            "admin.utilities.edit",
            "admin.utilities.update",
            "admin.utilities.destroy",
            "admin.users.index",
            "admin.users.create",
            "admin.users.store",
            "admin.users.show",
            "admin.users.edit",
            "admin.users.update",
            "admin.users.destroy",
            "admin.staffs.index",
            "admin.staffs.create",
            "admin.staffs.store",
            "admin.staffs.show",
            "admin.staffs.edit",
            "admin.staffs.update",
            "admin.staffs.destroy",
            "admin.rates.index",
            "admin.rates.create",
            "admin.rates.store",
            "admin.rates.show",
            "admin.rates.edit",
            "admin.rates.update",
            "admin.rates.destroy",
            "admin.cancel-policies.index",
            "admin.cancel-policies.create",
            "admin.cancel-policies.store",
            "admin.cancel-policies.show",
            "admin.cancel-policies.edit",
            "admin.cancel-policies.update",
            "admin.cancel-policies.destroy",
            "admin.promotions.index",
            "admin.promotions.create",
            "admin.promotions.store",
            "admin.promotions.show",
            "admin.promotions.edit",
            "admin.promotions.update",
            "admin.promotions.destroy",
            "admin.services.index",
            "admin.services.create",
            "admin.services.store",
            "admin.services.show",
            "admin.services.edit",
            "admin.services.update",
            "admin.services.destroy",
            "admin.bookings.index",
            "admin.bookings.create",
            "admin.bookings.store",
            "admin.bookings.show",
            "admin.bookings.edit",
            "admin.bookings.update",
            "admin.bookings.destroy",
            "admin.types.index",
            "admin.types.create",
            "admin.types.store",
            "admin.types.show",
            "admin.types.edit",
            "admin.types.update",
            "admin.types.destroy"
        ]
    }
    useEffect(() => {
        const user = cookies().Get('AuthUser')
        if(user){
            const myObject = JSON.parse(user as any).reduce((obj :any, item: any, index: any) => {
                obj[`key${index + 1}`] = item;
                return obj;
            }, {});
            setToken(myObject)   
        }
        
    },[])
    function handleSet(){
        cookies().Set('AuthUser', JSON.stringify(Object.values(data)), 1000*60*60*24*30)
    }
    function handleDelete(){
        cookies().Delete('AuthUser')
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <div>
                <button onClick={handleSet} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Set Cookie</button>
                <button onClick={handleDelete} type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete cookie</button>
                <div className="mt-3 text-center">
                    {/* <h1>{token ? token : ''}</h1> */}
                </div>
            </div>
        </div>
    )
}