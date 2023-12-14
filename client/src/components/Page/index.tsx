import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
  title: string;
};

export default function Page({ children, title }: Props) {
  useEffect(() => {
    window.document.title = `${title || ""} | Hotel Fpoly`;
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div>{children}</div>;
}
