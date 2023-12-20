import { useState } from "react";
import {
  Form,
  Input,
  Upload,
  Button,
  Select,
  message,
  Typography,
  InputNumber,
  Space,
  Row,
  Col,
  Radio,
  Skeleton,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { BiReset } from "react-icons/bi";
import { AiOutlineCheck, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGetRoomTypeQuery } from "../../../api/roomTypes";
// import { useGetAllBranchesQuery } from "../../../api/branches";
import { useCreateRoomMutation } from "../../../api/room";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const { Title, Text } = Typography;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const { TextArea } = Input;

const AddRoom = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetRoomTypeQuery({});
  // const { data: dataBranch, isLoading: isLoadingBranch } =
  //   useGetAllBranchesQuery({});
  const [createUser, { isLoading: isLoadingCreate }] = useCreateRoomMutation();

  const onFinish = (values: any) => {
    const formUpload = new FormData();
    const uploadedFiles = values.images.map(
      (fileInfo: any) => fileInfo.originFileObj
    );
    for (let i = 0; i < uploadedFiles.length; i++) {
      formUpload.append("images[]", uploadedFiles[i]);
    }
    const data = {
      ...values,
      pay_upon_check_in: 1,
    };
    delete data.images;
    for (const [key, value] of Object.entries(data)) {
      formUpload.append(`${key}`, `${value}`);
    }
    formUpload.delete("num_of_bed");
    formUpload.append("num_of_bed", JSON.stringify(values.num_of_bed));
    createUser(formUpload)
      .unwrap()
      .then((item) => {
        if (item.status == "success") {
          toast("Thêm mới thành công", {
            autoClose: 3000,
            theme: "light",
          });
          navigate("/room");
        } else {
          toast(item?.error?.name || "Lỗi rồi bạn", {
            autoClose: 3000,
            theme: "light",
          });
        }
      });
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const [fileList, setFileList] = useState([]);

  const dummyRequest = ({ onSuccess }: any) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleBeforeUpload = (file: any) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Bạn chỉ có thể tải lên file JPG/PNG!");
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error("Kích thước hình ảnh không được vượt quá 10MB!");
    }
    return isJpgOrPng && isLt10M;
  };

  const handleOnChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  if (isLoading) {
    return (
      <>
        <Skeleton />
      </>
    );
  }

  return (
    <div>
      <div className="max-w-[80%] mr-auto ml-10">
        <div className="mb-5">
          <Title level={3}>Thêm mới</Title>
        </div>

        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          initialValues={{
            num_of_bed: [
              {
                name: 0,
                key: 0,
                isListField: true,
                fieldKey: 0,
              },
            ], // or initial values
          }}
          layout="vertical"
          // style={{ maxWidth: 1000 }}
          className="grid grid-cols-1 xl:grid-cols-2"
        >
          <Form.Item
            label="Tên phòng"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên phòng" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Diện tích"
            name="area"
            rules={[{ required: true, message: "Vui lòng nhập diện tích" }]}
          >
            <InputNumber min={1} className="w-full" />
          </Form.Item>

          <Form.Item
            name="room_type_id"
            label="Loại phòng"
            hasFeedback
            rules={[{ required: true, message: "Vui lòng nhập loại phòng!" }]}
          >
            <Select>
              {data?.data?.map((item: any) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.room_type_name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Người lớn"
            name="adults"
            rules={[
              { required: true, message: "Vui lòng nhập tối đa số người lớn" },
            ]}
          >
            <InputNumber min={1} className="w-full" />
          </Form.Item>

          <Form.Item
            label="Trẻ con"
            name="children"
            rules={[{ required: true, message: "Vui lòng nhập tối đa trẻ em" }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          {/* 
          <Form.Item
            label="Số giường"
            name="num_of_bed"
            rules={[{ required: true, message: "Vui lòng nhập số giường" }]}
          >
            <InputNumber min={1} className="w-full" />
          </Form.Item> */}
          <Form.Item
            label="Tầng"
            name="floor"
            rules={[{ required: true, message: "Vui lòng nhập tầng" }]}
          >
            <InputNumber min={1} className="w-full" />
          </Form.Item>

          <Form.Item
            label="Tổng số lượng phòng"
            name="amount"
            rules={[
              { required: true, message: "Vui lòng nhập tổng số lượng phòng" },
            ]}
          >
            <InputNumber min={1} className="w-full" />
          </Form.Item>
          <div>
            <p className="mb-2">Giường</p>
            <Form.List name="num_of_bed">
              {(fields, { add, remove }) => {
                return (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        className="flex mb-2 w-[400px]"
                        // style={{width: 400,  display: "flex", marginBottom: 4 }}
                        align="center"
                      >
                        <div className="flex flex-col">
                          <p>Kích cỡ giường</p>
                          <Form.Item
                            {...restField}
                            name={[name, "size"]}
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập kích cỡ giường",
                              },
                            ]}
                          >
                            <Input placeholder="Kích cỡ giường" />
                          </Form.Item>
                        </div>
                        <div className="flex flex-col">
                          <p>Số giường</p>
                          <Form.Item
                            {...restField}
                            name={[name, "amount_bed"]}
                            rules={[
                              {
                                required: true,
                                message: "Không được để trống",
                              },
                              {
                                pattern: /^\d+$/,
                                message: "Chỉ được nhập số",
                              },
                            ]}
                          >
                            <InputNumber min={1} />
                          </Form.Item>
                        </div>
                        <div>
                          <p>Số người</p>
                          <Form.Item
                            {...restField}
                            name={[name, "slot"]}
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập ",
                              },
                              {
                                pattern: /^\d+$/,
                                message: "Chỉ được nhập số",
                              },
                            ]}
                          >
                            <InputNumber min={0} />
                          </Form.Item>
                        </div>
                        <MinusCircleOutlined
                          onClick={() => {
                            if (fields.length > 1) {
                              remove(name);
                            }
                          }}
                        />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Giường
                      </Button>
                    </Form.Item>
                  </>
                );
              }}
            </Form.List>
          </div>

          <Form.Item
            label="Ảnh"
            name="images"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Vui lòng tải lên ảnh!" }]}
          >
            <Upload
              name="avatar"
              beforeUpload={handleBeforeUpload}
              customRequest={dummyRequest}
              onChange={handleOnChange}
              listType="picture"
              maxCount={4}
              fileList={fileList}
              multiple
            >
              {fileList.length === 4 ? (
                ""
              ) : (
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              )}
            </Upload>
          </Form.Item>

          {/* <Form.Item name="bed_size" label="Kích cỡ giường">
            <Radio.Group>
              <Row className="">
                <Col>
                  <Radio value="0" style={{ lineHeight: "32px" }}>
                    2 lớn
                  </Radio>
                </Col>
                <Col>
                  <Radio value="1" style={{ lineHeight: "32px" }}>
                    1 lớn , 1 nhỏ
                  </Radio>
                </Col>
              </Row>
            </Radio.Group>
          </Form.Item> */}

          <Form.Item name="pay_is_checkin" label="Hình thức thanh toán">
            <Radio.Group>
              <Row className="">
                <Col>
                  <Radio value="0" style={{ lineHeight: "32px" }}>
                    Thẻ tín dụng
                  </Radio>
                </Col>
                <Col>
                  <Radio value="1" style={{ lineHeight: "32px" }}>
                    Thanh toán tiền mặt
                  </Radio>
                </Col>
              </Row>
            </Radio.Group>
          </Form.Item>

          {/* <Form.Item
            name="policies_and_information"
            label="Chính sách"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn chính sách phòng!",
                type: "array",
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Vui lòng chọn chính sách phòng!"
            >
              <Option value="red">Chính sách 1</Option>
              <Option value="green">Chính sách 2</Option>
              <Option value="blue">Chính sách 3</Option>
            </Select>
          </Form.Item> */}

          {/* <Form.Item name="rate" label="Đánh giá">
            <Rate />
          </Form.Item> */}
          <Form.Item
            label="Giảm giá"
            name="discount"
            rules={[{ required: true, message: "Vui lòng nhập giảm giá" }]}
          >
            <InputNumber min={1} className="w-full" />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Space className="flex flex-col md:flex-row">
              <Button
                className="flex items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-3 py-2.5 text-center"
                type="default"
                htmlType="submit"
              >
                {isLoadingCreate ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  <AiOutlineCheck className="text-[#fff] " />
                )}
                <Text className=" text-[#fff] ml-1">Thêm</Text>
              </Button>
              <Button
                className="flex items-center text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-4 py-2.5"
                htmlType="reset"
              >
                <BiReset className="text-[#fff]" />
                <Text className="text-[#fff] ml-1">Làm mới</Text>
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddRoom;
