"use client";

import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

interface AvatarProps {
  src?: string | null | undefined;
}
const Avatar: React.FC<AvatarProps> = ({ src }) => {
  if (src) {
    return <div>
      <Image
        src={src}
        alt="Avatar"
        className="rounded-full"
        height="30"
        width="30"
      />
      <div>
        <span className="text-xs text-gray-400">User</span>
        <span className="text-xs text-gray-400">Admin</span>


      </div>
    </div>
  }
  return <div className="flex flex-row gap-2">
    <FaUserCircle size={32} />
    <div className="flex flex-col">
      <span className="text-xs font-semibold text-gray-700">User</span>
      <span className="text-xs font-semibold text-gray-400">Admin</span>
    </div>
  </div>
};

export default Avatar;
