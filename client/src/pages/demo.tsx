import { useState } from "react";
import { useCookies } from "react-cookie";
const Demo = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [user, setUser] = useState(null);
    function handleClick() { 
        setCookie("user", JSON.stringify([1, 2, 3, 4, 5]), {
          path: "/",
          maxAge: 3600,
          sameSite: true,
        });
    }
    function handleDelete() { 
        removeCookie('user', { path: '/' })
    }
    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div>
                    <button onClick={handleDelete} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Xoá cookie</button>
                    <button onClick={handleClick} type="button" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Set cookie</button>
                    <div className="mt-4 mb-4"></div>
                    <div className="text-center">
                        {cookies.user && <p>{cookies.user}</p>}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Demo;