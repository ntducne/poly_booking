import { SmileOutlined } from "@ant-design/icons";
import { Result, message } from "antd";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useSearchOrdersMutation } from "../../../api/Order";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function StatusPayment() {
    const [status, setStatus] = useState(0);
    const [, setCookie, removeCookie] = useCookies(["paymentPage", "userBook", "roomSearch", "bookingNow", "paymentMethod"]);
    const [billing_id, setBilling_id] = useState(null);
    const location = useLocation();
    const Navigate = useNavigate();
    const [searchBillingId] = useSearchOrdersMutation();
    useEffect(() => {
        removeCookie('bookingNow', { path: '/' });
        removeCookie('roomSearch', { path: '/' });
        removeCookie('userBook', { path: '/' });
        removeCookie('paymentMethod', { path: '/' });
        setCookie("paymentPage", 3, { path: "/" });
        setStatus(+location.search.split('=')[1]);
        searchBillingId({ billing_id: +location.search.split('=')[1] })
            .unwrap()
            .then((req) => {
                if(req?.status == 'error'){
                    message.error(req?.message);
                    Navigate('/');
                }
                if(req?.status == 'success'){
                    message.success(req?.message);
                    var status = req?.data?.status;
                    if(status != 0){
                        Navigate('/');
                    }
                    setStatus(req?.data?.status)
                    setBilling_id(req?.data?.billingCode)
                }
            })
            .catch((err) => {
                message.error(err?.data.message);
            });
    }, []);

    return (
        <div className="container mx-auto mt-14"
            style={{
                maxWidth: 1000,
            }}
        >
            {status == 0 && (
                <Result
                    icon={<SmileOutlined />}
                    title={
                        <>
                            <Spin indicator={antIcon} /> Chờ xíu !!!
                        </>
                    }
                />
            )}
            {status == 1 && (
                <div className="container px-4 mx-auto" data-path="0.0">
                    <Result
                        status="success"
                        title="Đặt phòng thành công !"
                        subTitle={`Cảm ơn quý khách đã đặt phòng tại khách sạn của chúng tôi. Chúng tôi sẽ liên hệ với quý khách trong thời gian sớm nhất. Mã hoá đơn của quý khách là ${billing_id}.`}
                        extra={[
                            <>
                                <Link to="/" type="button" key="buy">
                                    Về trang chủ
                                </Link>
                                , Quý khách có thể kiểm tra hoá đơn{" "}
                                <Link to={`/search-order`} type="button" key="buy">
                                    Tại đây
                                </Link>
                            </>,
                        ]}
                    />
                </div>
            )}
        </div>
    );
}
