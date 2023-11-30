import React, { useEffect } from "react";
// import { permission } from "../../middleware/permission";

type Props = {
  children: React.ReactNode;
  title: string;
  // name: string;
};

const Page = ({ children, title  }: Props) => {
  
  useEffect(() => {
    // permission().checkPermission(name);
    window.document.title = `${title || ""} | Admin Hotel Fpoly`;
  }, []);
  return <div>{children}</div>;
};

export default Page;
