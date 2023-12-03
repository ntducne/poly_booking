import React from "react";
import { useGetProfileQuery } from "../api/User";
import { cookies } from "../config/cookie";

const Demo: React.FC = () => {
  const { data } = useGetProfileQuery({});
  console.log(data);
  console.log(JSON.parse(cookies().Get('userInfo') as any));
  return (
      <div>
          <h1>Demo</h1>
          <p>This is a demo page.</p>
      </div>
  )
};

export default Demo;
