"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import john from "../public/avata.jpg";
import { AiOutlineClose } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
const Navbar = () => {
  const { data: session, status } = useSession();

  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const loggedIn = true;
  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div className="container py-2 h-16 flex items-center justify-between">
      <Link href="/">
        <h2>
          Light<span className="special-word">Code</span>
        </h2>
      </Link>
      <ul className="flex items-center gap-3 ">
        <li>
          <Link
            href="/blog"
            className={
              pathname === "/blog" ? "text-primaryColor font-bold" : ""
            }
          >
            Блог
          </Link>
        </li>
        {session ? (
          <>
            <li>
              <Link
                href="/create-blog"
                className={
                  pathname === "/create-blog"
                    ? "text-primaryColor font-bold"
                    : ""
                }
              >
                Создать запись
              </Link>
            </li>
            <li>
              <div className="relative">
                <Image
                  onClick={handleShowDropdown}
                  src={john}
                  alt="john"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                {showDropdown && (
                  <div className="absolute top-0 right-0 bg-primaryColorLight p-5 rounded-lg">
                    <AiOutlineClose
                      onClick={handleShowDropdown}
                      className="cursor-pointer absolute top-0 right-0 text-white hover:text-gray-400 transition duration-300"
                    />
                    <Link href="/user" onClick={handleShowDropdown}>
                      Профиль
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        handleShowDropdown();
                      }}
                    >
                      Выйти
                    </button>
                  </div>
                )}
              </div>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                href="/login"
                className={
                  pathname === "/login" ? "text-primaryColor font-bold" : ""
                }
              >
                Войти
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className={
                  pathname === "/signup" ? "text-primaryColor font-bold" : ""
                }
              >
                Зарегистрироваться
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
