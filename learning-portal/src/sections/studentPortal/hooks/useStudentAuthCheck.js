import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../../../features/auth/authSlice";

export default function useStudentAuthCheck() {
  const dispatch = useDispatch();
  const [studentAuthCheck, setstudentAuthCheck] = useState(false);

  useEffect(() => {
    const localAuth = localStorage?.getItem("auth");

    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.accessToken && auth?.user && auth?.user.role === "student") {
        dispatch(
          userLoggedIn({
            accessToken: auth.accessToken,
            user: auth.user,
          })
        );
        setstudentAuthCheck(true)
      }
    }
    // setstudentAuthCheck(true);
  }, [dispatch, setstudentAuthCheck]);

  return studentAuthCheck;
}
