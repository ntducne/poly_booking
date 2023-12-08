import React from "react";
import { Skeleton } from "antd";

const PcLoading: React.FC = () => {
  return (
    <div>
      <Skeleton
        loading={true}
        active
        paragraph={{ rows: 3, width: 866 }}
        title={false}
      ></Skeleton>
    </div>
  );
};

export default PcLoading;
