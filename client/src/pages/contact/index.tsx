import { Form, Input, message } from "antd";
import HeroSlide from "../../components/HeroSlide";
import TextArea from "antd/es/input/TextArea";
import { useHandleContactMutation } from "../../api/Client";
import Page from "../../components/Page";

const Contact = () => {
  const [postContact] = useHandleContactMutation();

  const onFinishContact = (values: any) => {
    if (values) {
      postContact({ ...values })
        .unwrap()
        .then(() => {
          message.success("Liên hệ  thành công");
        })
        .catch((error) => {
          console.log(error);
          message.error("Liên hệ thất bại");
        });
    }
  };

  const onFinishFailedContact = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Page title="Liên hệ">
      <div className="bg-white">
        <HeroSlide />

        <section className=" " id="contact">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <div className="mb-4">
              <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
                {/* <p className="text-base font-semibold uppercase tracking-wide text-blue-600 ">
                                Liên hệ
                            </p> */}
                <h2 className="font-heading mb-4 font-bold tracking-tight text-gray-900 text-3xl sm:text-5xl">
                  Liên hệ với chúng tôi
                </h2>
                <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 ">
                  Luôn luôn lắng nghe, luôn luôn thấu hiểu
                </p>
              </div>
            </div>
            <div className="flex items-stretch justify-center">
              <div className="grid md:grid-cols-2">
                <div className="h-full pr-6">
                  <p className="mt-3 mb-12 text-lg text-gray-600 ">
                    Chúng tôi luôn sẵn lòng lắng nghe và hành cùng quý khách
                    hàng. Đừng ngần liên hệ với chúng tôi để được tư vấn hoặc
                    đặt phòng. Chúng tôi cam kết cung cấp dịch vụ chăm sóc khách
                    hàng tận tâm, mang lại cho bạn trải nghiệm lưu trú không
                    giới hạn. Hãy để chúng tôi chia sẻ niềm vui của bạn!
                  </p>
                  <ul className="mb-6 md:mb-0">
                    <li className="flex">
                      <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          stroke-linecap="round"
                          strokeLinecap="round"
                          className="h-6 w-6"
                        >
                          <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                          <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                        </svg>
                      </div>
                      <div className="ml-4 mb-4">
                        <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 ">
                          Địa chỉ
                        </h3>
                        <p className="text-gray-600 ">
                          1230 Maecenas Street Donec Road
                        </p>
                        <p className="text-gray-600 ">New York, EEUU</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          stroke-linecap="round"
                          strokeLinecap="round"
                          className="h-6 w-6"
                        >
                          <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                          <path d="M15 7a2 2 0 0 1 2 2"></path>
                          <path d="M15 3a6 6 0 0 1 6 6"></path>
                        </svg>
                      </div>
                      <div className="ml-4 mb-4">
                        <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                          Thông tin
                        </h3>
                        <p className="text-gray-600 ">Mobile: +84 123456789</p>
                        <p className="text-gray-600 ">
                          Mail: PolyDevHotel@gmail.com
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          stroke-linecap="round"
                          strokeLinecap="round"
                          className="h-6 w-6"
                        >
                          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                          <path d="M12 7v5l3 3"></path>
                        </svg>
                      </div>
                      <div className="ml-4 mb-4">
                        <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                          Thời gian làm việc
                        </h3>
                        <p className="text-gray-600 ">
                          Thứ 2 - Thứ 6: 08:00 - 17:00
                        </p>
                        <p className="text-gray-600 ">
                          Thứ 7 &amp; Chủ Nhật: 08:00 - 12:00
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="card h-fit max-w-6xl p-5 md:p-12" id="form">
                  <h2 className="mb-4 text-2xl font-bold">
                    Sẵn sàng để bắt đầu?
                  </h2>
                  <Form
                    name="basic"
                    onFinish={onFinishContact}
                    onFinishFailed={onFinishFailedContact}
                    autoComplete="off"
                  >
                    <div className="mb-6">
                      <div className="mx-0 mb-1 sm:mb-4">
                        <div className="mx-0 mb-1 sm:mb-4">
                          <Form.Item
                            className="pb-1 text-xs uppercase tracking-wider"
                            name="name"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập tên!",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Tên"
                              className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                            />
                          </Form.Item>
                        </div>
                        <div className="mx-0 mb-1 sm:mb-4">
                          <Form.Item
                            className="pb-1 text-xs uppercase tracking-wider"
                            name="email"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập Email!",
                              },
                              {
                                type: "email",
                                message: "Địa chỉ email không hợp lệ!",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Email"
                              className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                            />
                          </Form.Item>
                        </div>
                        <div className="mx-0 mb-1 sm:mb-4">
                          <Form.Item
                            name="message"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập bình luận",
                              },
                            ]}
                          >
                            <TextArea
                              rows={3}
                              placeholder="Nội dung câu hỏi"
                              className="pt-3"
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>

                    <Form.Item>
                      <button className="w-full bg-blue-800 text-white px-6 py-3 font-xl rounded-md sm:mb-0">
                        Đánh giá
                      </button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container mx-auto w-100%">
          <section className="">
            <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
              <div className=" items-center">
                <div className="block w-full shrink-0 grow-0 basis-auto ">
                  <div className="h-[500px] w-full">
                    <iframe
                      src="https://maps.google.com/maps?q=manhatan&t=&z=13&ie=UTF8&iwloc=&output=embed"
                      className="left-0 top-0 h-full w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Page>
  );
};

export default Contact;
