import { Link } from "react-router-dom";
import HeroSlide from "../../components/HeroSlide";
import SearchDetailOrder from "../../sections/SearchOrder/SearchDetailOrder";

type Props = {};

export default function SearchOrder({}: Props) {
  return (
    <div>
      <HeroSlide />
      <div className="w-full my-[60px] ">
        <div className="px-[50px] bg-white max-w-[1200px] rounded-xl flex flex-col mx-auto">
          <ul
            className="mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0"
            role="tablist"
            data-te-nav-ref
          >
            <li role="presentation">
              <Link
                to="#tabs-home"
                className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                data-te-toggle="pill"
                data-te-target="#tabs-home"
                data-te-nav-active
                role="tab"
                aria-controls="tabs-home"
                aria-selected="true"
              >
                Tra cứu đơn hàng
              </Link>
            </li>
            <li role="presentation">
              <a
                href="#tabs-profile"
                className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                data-te-toggle="pill"
                data-te-target="#tabs-profile"
                role="tab"
                aria-controls="tabs-profile"
                aria-selected="false"
              >
                Chính sách giao hàng
              </a>
            </li>
            <li role="presentation">
              <a
                href="#tabs-messages"
                className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                data-te-toggle="pill"
                data-te-target="#tabs-messages"
                role="tab"
                aria-controls="tabs-messages"
                aria-selected="false"
              >
                Quy trình giao hàng
              </a>
            </li>
            <li role="presentation">
              <a
                href="#tabs-contact"
                className="disabled pointer-events-none my-2 block border-x-0 border-b-2 border-t-0 border-transparent bg-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-400 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent dark:text-neutral-600"
                data-te-toggle="pill"
                data-te-target="#tabs-contact"
                role="tab"
                aria-controls="tabs-contact"
                aria-selected="false"
              >
                Cách thức tra cứu
              </a>
            </li>
          </ul>

          <div className="mb-6">
            <div
              className="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
              id="tabs-home"
              role="tabpanel"
              aria-labelledby="tabs-home-tab"
              data-te-tab-active
            >
              <SearchDetailOrder />
            </div>
            <div
              className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
              id="tabs-profile"
              role="tabpanel"
              aria-labelledby="tabs-profile-tab"
            >
              Tab 2 content
            </div>
            <div
              className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
              id="tabs-messages"
              role="tabpanel"
              aria-labelledby="tabs-profile-tab"
            >
              Tab 3 content
            </div>
            <div
              className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
              id="tabs-contact"
              role="tabpanel"
              aria-labelledby="tabs-contact-tab"
            >
              Tab 4 content
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
