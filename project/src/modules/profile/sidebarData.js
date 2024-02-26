import {
  BsFillFileEarmarkPersonFill,
  BsJournalMedical,
  BsCreditCard2BackFill,
} from "react-icons/bs";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { MdMarkEmailUnread } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

// 1. Personal Information
// 2. Medical Record
// 3. Change password
// 4. Payment

const sidebarData = [
  {
    icon: <BsFillFileEarmarkPersonFill className="icon" />,
    text: "Personal Information",
    path: "/profile/user-form",
  },
  {
    icon: <AiOutlineHeart className="icon" />,
    text: "Favorite",
    path: "/profile/favorite",
  },
  {
    icon: <MdMarkEmailUnread className="icon" />,
    text: "Watch",
    path: "/profile/watch",
  },
  {
    icon: <BsCreditCard2BackFill className="icon" />,
    text: "Payments",
    path: "/profile/payments",
  },
  {
    icon: <AiOutlineShoppingCart className="icon" />,
    text: "Cart",
    path: "/profile/cart",
  },
  {
    icon: <RiLockPasswordFill className="icon" />,
    text: "Change password",
    path: "/profile/change-password",
  },
];

export default sidebarData;
