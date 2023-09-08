import { Button, Input } from "antd";
import React, { useState } from "react";

type Props = {};

const FormSearch = (props: Props) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = () => {
    // Gửi yêu cầu tìm kiếm hoặc xử lý dữ liệu tại đây
    console.log("Đã gửi yêu cầu tìm kiếm:", searchValue);
  };

  return (
    <div className="flex">
      <Input
        placeholder="Nhập từ khóa"
        value={searchValue}
        onChange={handleSearchChange}
      />
      <Button className="" type="dashed" onClick={handleSearchSubmit}>
        Tìm kiếm
      </Button>
    </div>
  );
};

export default FormSearch;
