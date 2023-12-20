import { Image } from "antd";
// import React from "react";
import { Link } from "react-router-dom";
import Page from "../../../component/page";

const NotFound = () => {
  return (
    <Page title={`404 Not Found`}>
      <section className="bg-white dark:bg-gray-900 ">
        <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
          <div className="wf-ull lg:w-1/2">
            <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
              404 error
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
              Không tìm thấy trang
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Xin lỗi, trang bạn đang tìm kiếm không tồn tại. Dưới đây là một số
              liên kết hữu ích:
            </p>

            <div className="flex items-center mt-6 gap-x-3">
              <Link to={`/`}>
                <button className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                  Về trang chủ
                </button>
              </Link>
            </div>
          </div>

          <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
            {/* <Image/> */}
            <Image
              // width={200}
              className="w-full max-w-lg lg:mx-auto"
              src="https://merakiui.com/images/components/illustration.svg"
            />
            {/* <Image className="w-full max-w-lg lg:mx-auto" src="/images/components/illustration.svg" alt=""> */}
          </div>
        </div>
      </section>
    </Page>
  );
};

export default NotFound;
