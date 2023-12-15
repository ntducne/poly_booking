import { Link } from "react-router-dom";
import { cookies } from "../config/cookies";

export default function Welcome() {
    const user = JSON.parse(cookies().Get("AuthUser") as any)[1];
    return (
        <>
            <div className="relative">
                <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 ">
                    <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400"></div>
                    <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300"></div>
                </div>
                <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
                    <div className="relative pt-6 ml-auto">
                        <div className="lg:w-2/3 text-center mx-auto">
                            <h1 className="text-gray-900 font-semibold text-5xl md:text-6xl xl:text-7xl">Xin chào <br /> <span className=" text-4xl">{user.name}</span></h1>
                            <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                                <Link
                                    to="/branches"
                                    className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                                >
                                    <span className="relative text-base font-semibold text-white">Chi nhánh</span>
                                </Link>
                                <Link
                                    to="/staff"
                                    className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                                >
                                    <span className="relative text-base font-semibold text-white">Tài khoản admin</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}