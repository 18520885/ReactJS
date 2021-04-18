//Đè lại Route mặc định

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminRoute({children, ...props}) {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return <Redirect to={`/login?redirectTo=${props.path}`} />;
  }

  //Đăng nhập nhưng không phải là giảng viên
  if (userInfo.maLoaiNguoiDung !== "GV") {
    return <Redirect to="/" />;
  }

  return <Route {...props}>{children}</Route>;
}
