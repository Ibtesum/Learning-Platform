import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../../../features/auth/authSlice";

export default function useAdminAuthCheck() {
  const dispatch = useDispatch();
  const [adminAuthChecked, setAdminAuthChecked] = useState(false);

  useEffect(() => {
    const localAuth = localStorage?.getItem("auth");

    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.accessToken && auth?.user && auth?.user.role === "admin") {
        dispatch(
          userLoggedIn({
            accessToken: auth.accessToken,
            user: auth.user,
          })
        );
        setAdminAuthChecked(true);
      }
    }
  }, [dispatch, setAdminAuthChecked]);

  return adminAuthChecked;
}
