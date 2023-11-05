import { Button, Col, Modal, Row, Image } from "antd";
import formatMoneyVN from "../../config/formatMoneyVN";
import { RoomInterface } from "../../Interface/RoomInterface";

interface DetailRoomModalProps {
  room: RoomInterface | any;
  isOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export const DetailRoomModal = (props: DetailRoomModalProps) => {
  console.log(props.room);

  if (props.room === null) return <></>;
  return (
    <>
      <Modal
        title="Chi tiết phòng"
        open={props.isOpen as any}
        onOk={props.setIsModalOpen as any}
        onCancel={props.setIsModalOpen as any}
        okType="default"
      >
        <div className="">
            <Row gutter={[16, 16]}>
                <Col span={12}>
                <Image
                    src={props.room?.images[0]?.image}
                    width={200}
                    height={200}
                    alt="image"
                />
                </Col>
                <Col span={12}>
                <div className="flex flex-col">
                    <div className="flex flex-col">
                    <p className="font-bold">Tên phòng</p>
                    <p>{props.room?.name}</p>
                    </div>
                    <div className="flex flex-col">
                    <p className="font-bold">Giá phòng</p>
                    <p>{formatMoneyVN(props.room?.price)}</p>
                    </div>
                    <div className="flex flex-col">
                    <p className="font-bold">Người lớn</p>
                    <p>{props.room?.adults}</p>
                    </div>
                    <div className="flex flex-col">
                    <p className="font-bold">Trẻ con</p>
                    <p>{props.room?.childrend}</p>
                    </div>
                    <div className="flex flex-col">
                    <p className="font-bold">Chi nhánh</p>
                    <p>{props.room?.branch?.name}</p>
                    </div>
                    <div className="flex flex-col">
                    <p className="font-bold">Mô tả</p>
                    <p>{props.room?.description}</p>
                    </div>
                </div>
                </Col>
            </Row>
        </div>
      </Modal>
    </>
  );
};
