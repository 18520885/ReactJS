import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../constants/auth";

import authAPI from "../Services/authAPI";

export function login(values) {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const { data } = await authAPI.login(values);
      //Lưu thông tin xuống local storage để giữ trạng thái đăng nhập khi tắt hoặc F5 lại trang web
      localStorage.setItem("userInfo", JSON.stringify(data));

      dispatch({ type: LOGIN_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: { error: error.response.data },
      });
    }
  };
}
