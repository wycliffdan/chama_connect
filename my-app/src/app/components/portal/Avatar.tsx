
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AvatarProps {
  imageUrl: string; // URL of the user's avatar image
  onLogout: () => void;
}

const Avatar = ({ imageUrl, onLogout }: AvatarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleProfileClick = () => {
    router.push("/profile");
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="focus:outline-none">
        <img
          src={imageUrl}
          alt="User Avatar"
          className="w-10 h-10 rounded-full cursor-pointer"
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
          <ul className="py-2">
            <li>
              <button
                onClick={handleProfileClick}
                className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={onLogout}
                className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
            {/* Add more options here */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Avatar;