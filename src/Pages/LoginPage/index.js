import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, FormGroup, Label, Alert } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { login } from "src/actions/auth";
import {Redirect, useLocation} from 'react-router-dom';
import qs from 'qs';

//Có 2 cách lưu trữ giá trị ô input:
//Cách 1: Controlled Components:  Control tất cả mọi thứ trên giao diện bằng state, props

//Cách 2: Uncontrolled Components: Control giao diện không thông qua state và props

//Cả useState và useRef dùng để lưu trữ data
//Khác: Khi state thay đổi Component bị render lại, ref thay đổi component ko bị render lại => Tối ưu performance

//Tạo schema validation
const schema = yup.object().shape({
  taiKhoan: yup
    .string()
    .required("Tài khoản không được để trống")
    .min(5, "Tài khoản phải từ 5 đến 20 kí tự")
    .max(20, "Tài khoản phải từ 5 đến 20 kí tự"),
  matKhau: yup.string().required("Mật khẩu không được để trống"),
});
export default function LoginPage() {
  //   const inputTaiKhoan = useRef();
  //   const inputMatKhau = useRef();
  const dispatch = useDispatch();
  const { userInfo, isLoading, error } = useSelector((state) => state.auth);
  const location = useLocation();
  

  const {
    register,
    handleSubmit,
    formState: { errors }, //dùng để bắt lỗi valid trong form

    //Sử dụng khi UI không hỗ trợ Register
    control,
  } = useForm({ resolver: yupResolver(schema) });

  const handleLogin = (values) => {
    // console.log(inputTaiKhoan.current.value);
    // console.log(inputMatKhau.current.value);
    console.log(values);

    //Dispatch action Đăng nhập
    dispatch(login(values));
  };

  //   console.log(errors);

  //Kiểm tra thành công. Khi userInfo có dữ liệu thì chuyển người dùng về trang Home
  if(userInfo){
    const {redirectTo} = qs.parse(location.search, {ignoreQueryPrefix: true});
    if(redirectTo){
      return <Redirect to={redirectTo}/>
    }

    return <Redirect to="/"/>
  }

  //Sử dụng handleSubmit để chống cơ chế load lại trang của submit mặc định.
  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <h1>Login page</h1>
      <div className="form-group">
        <label>Tai khoan</label>
        <input type="text" className="form-control" {...register("taiKhoan")} />
      </div>
      {errors.taiKhoan && (
        <Alert color="danger">{errors.taiKhoan.message}</Alert>
      )}

      {/* <div className="form-group">
        <label>Mat khau</label>
        <input
          type="text"
          className="form-control"
          {...register("matkhau", {
            required: { value: true, message: "Tài khoản không được để trống" },
            minLength: {
              value: 5,
              message: "Tài khoản phải từ 5 đến 20 kí tự",
            },
            maxLength: {
              value: 20,
              message: "Tài khoản phải từ 5 đến 20 ký tự",
            },
          })}
        />
      </div> */}
      {/* <FormGroup>
        <Label>Mật khẩu</Label>
        <Input
          type="text"
          {...register("matkhau", {
            required: { value: true, message: "Mật khẩu không được để trống" },
          })}
        />
      </FormGroup> */}

      <FormGroup>
        <Label>Mật khẩu</Label>
        <Controller
          name="matKhau"
          control={control}
          defaultValue=""
          rules={{
            required: { value: true, message: "Mật khẩu không được để trống" },
          }}
          render={({ field }) => {
            return <Input {...field} type="password" />;
          }}
        />
      </FormGroup>
      {errors.matKhau && <Alert color="danger">{errors.matKhau.message}</Alert>}

          {error && <Alert color="danger">{error}</Alert>}
      <button className="btn btn-success">Đăng nhập</button>
    </form>
  );
}
