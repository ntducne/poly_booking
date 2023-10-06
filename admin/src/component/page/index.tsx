import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
  title: string;
};

const Page = ({ children, title }: Props) => {
  useEffect(() => {
    window.document.title = `${title || ""} | Admin Hotel Fpoly`;
  }, []);
  return <div>{children}</div>;
};

export default Page;
