import axios from "axios";
import qs from "qs";

const axiosClient = axios.create({
  baseURL: "https://elearning0706.cybersoft.edu.vn/api",
  //Tự cấu hình cách lấy param mặc định của axios
  paramsSerializer: (params) => {
    //Bỏ qua giá trị null và undefined trong params
    return qs.stringify(params, { skipNulls: true });
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    //xử lý trước khi request gửi lên server
    //Thêm Authorization vào header
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const { accessToken } = JSON.parse(userInfo);
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log(config);
    return config;
    
  },
  (error) => {
    //Xử lý khi request bị lỗi
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  //Luôn chạy trước method get của axios và sẽ trả về giá trị mà ta return. Nêu bth thì return response
  (response) => {
    return { data: [1, 2, 3] };
  },
  (error) => {
    //Xử lý nếu kết quả trả về bị lỗi
    if(error.status === 401)
    {
      //Xử lý logout: Clear local storage và đẩy người dùng về lại trang login
    }
    if(error.status === 500){
      //Xử lý thông báo cho người dùng biết server đang bị lỗi
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
