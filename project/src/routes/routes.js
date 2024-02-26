import {
  PATH_PATIENT_PROFILE,
  PATH_PATIENT_PROFILE_USER_FORM,
  PATH_PATIENT_PROFILE_PAYMENTS,
  PATH_PATIENT_PROFILE_CHANGE_PASSWORD,
  PATH_PATIENT_PROFILE_APPOINTMENTS,
  PATH_PATIENT_PROFILE_PAYMENT_VIEW,
  PATH_PATIENT_PROFILE_MEDICAL_RECORDS,
  PATH_PATIENT_PROFILE_MEDICAL_RECORD_DETAIL,
  PATH_BOOK_DETAIL,
  PATH_PATIENT_PROFILE_CART,
  PATH_PATIENT_PROFILE_WATCH,
  PATH_PATIENT_PROFILE_FAVORITE,
  PATH_PATIENT_PROFILE_PAYMENT_CHECKOUT,
} from "./path";

import Profile from "../pages/profile";
import UserInfo from "../pages/profile/userInfo";
import Payment from "../pages/profile/payment";
import PaymentDetailPage from "../pages/profile/payment/detail";
import ChangePassword from "../pages/profile/changePassword";
import Appointment from "../pages/profile/appointment";
import NoMatch from "../pages/noMatch";
import MedicalRecord from "../pages/profile/medicalRecord";
import MedicalRecordDetailPage from "../pages/profile/medicalRecord/detail";
import BookDetailPage from "../pages/bookStore/detail";
import CheckoutPage from "../pages/profile/payment/checkout";
import CartPage from "../pages/profile/cart";
import FavoritePage from "../pages/profile/favorite";
import WatchPage from "../pages/profile/watch";

const appRoutes = [
  {
    path: PATH_PATIENT_PROFILE,
    element: <Profile />,
    subnavs: [
      {
        path: PATH_PATIENT_PROFILE_USER_FORM,
        element: <UserInfo />,
      },
      {
        path: PATH_PATIENT_PROFILE_PAYMENTS,
        element: <Payment />,
      },
      {
        path: PATH_PATIENT_PROFILE_APPOINTMENTS,
        element: <Appointment />,
      },
      {
        path: PATH_PATIENT_PROFILE_CART,
        element: <CartPage />,
      },
      {
        path: PATH_PATIENT_PROFILE_CHANGE_PASSWORD,
        element: <ChangePassword />,
      },
      {
        path: PATH_PATIENT_PROFILE_MEDICAL_RECORDS,
        element: <MedicalRecord />,
      },
      {
        path: PATH_PATIENT_PROFILE_MEDICAL_RECORD_DETAIL,
        element: <MedicalRecordDetailPage />,
      },
      {
        path: PATH_PATIENT_PROFILE_WATCH,
        element: <WatchPage />,
      },
      {
        path: PATH_PATIENT_PROFILE_FAVORITE,
        element: <FavoritePage />,
      },
      {
        path: "*",
        element: <NoMatch />,
      },
    ],
  },
  {
    path: PATH_PATIENT_PROFILE_PAYMENT_VIEW,
    element: <PaymentDetailPage />,
  },
  {
    path: PATH_PATIENT_PROFILE_PAYMENT_CHECKOUT,
    element: <CheckoutPage />,
  },
  // {
  //   path: PATH_BOOK_DETAIL,
  //   element: <BookDetailPage />,
  // },
];

export default appRoutes;
