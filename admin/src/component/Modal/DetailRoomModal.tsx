import { Button, Col, Modal, Row, Image } from "antd";
import formatMoneyVN from "../../config/formatMoneyVN";
import { RoomInterface } from "../../Interface/RoomInterface";

interface DetailRoomModalProps { 
    room: RoomInterface | any;
    isOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
}



export const DetailRoomModal = (props :DetailRoomModalProps) => { 
    console.log(props.room);
    
    if(props.room === null) return (<></>)
    return (
        <>
            <Modal title="Chi tiết phòng" open={props.isOpen as any} onOk={props.setIsModalOpen as any} onCancel={props.setIsModalOpen as any}>
                <div className="grid grid-cols-3 gap-5">
                    <div className="border"> Thông tin ở : checkin, checkout, adult, children, branch</div>
                    <div className="border">Thông tin phòng: loại phòng, giá 1 đêm</div>
                    <div className="border">Thông tin khách đặt</div>    
                </div>
                
                <Row>
                    {/* <Col span={12}>
                        <Image width={300} src={props.room?.images[0]?.image}/>
                    </Col> */}
                    {/* <Col span={12}>
                        <Row>
                            <Col span={12}>
                                <p>Tên phòng: </p>
                            </Col>
                            <Col span={12}>
                                <p>{props.room?.name}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <p>Loại phòng: </p>
                            </Col>
                            <Col span={12}>
                                <p>{props.room?.type?.props.room_type_name}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <p>Giá ( 1 đêm ): </p>
                            </Col>
                            <Col span={12}>
                                <p>{formatMoneyVN(props.room?.type?.price_per_night)}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <p>Chi nhánh: </p>
                            </Col>
                            <Col span={12}>
                                <p>{props.room?.branch?.name}</p>
                            </Col>
                        </Row>
                    </Col> */}
                </Row>
            </Modal>
        </>
    )
};