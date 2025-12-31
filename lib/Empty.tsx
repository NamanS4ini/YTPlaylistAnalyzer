import React from "react";
import { FaRegFolderOpen } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Empty = ({
  title,
  desc,
  icon,
  btnText,
}: {
  title: string;
  desc: string;
  icon?: React.ReactNode;
  btnText?: string;
}) => {
  return (
    <main className=" bg-zinc-950 text-white flex flex-col items-center justify-center px-6 text-center">
      {icon ? (
        icon
      ) : (
        <FaRegFolderOpen className="text-zinc-500 text-5xl mb-6" />
      )}

      <h1 className="text-3xl font-bold mb-2">{title}</h1>

      <p className="text-zinc-400 mb-4 max-w-md">{desc}</p>

      {btnText && (
        <Link href="/">
          <Button className="cursor-pointer">{btnText}</Button>
        </Link>
      )}
    </main>
  );
};

export default Empty;
