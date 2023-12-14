import { Input } from "antd";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

// type Props = {};

const FormSearch = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Đã gửi yêu cầu tìm kiếm:", searchValue);
  };

  return (
    <div className="flex">
      <Input
        placeholder="Nhập từ khóa"
        value={searchValue}
        onChange={handleSearchChange}
        className=""
      />
      {/* <Button className="flex justify-between items-center font-medium rounded-lg px-5 py2.5" type="dashed" onClick={handleSearchSubmit}>
          <AiOutlineSearch/>
         <p className="">
          Tìm kiếm
          </p>
      </Button> */}
      <button
        type="button"
        className="ml-1 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-3 py-3 text-center"
        onClick={handleSearchSubmit}
      >
        <AiOutlineSearch />
      </button>
    </div>
  );
};

export default FormSearch;
