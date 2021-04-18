import axiosClient from "./axiosClient";

const coursesAPI = {
  getCourses: () => {
    return axiosClient.get("/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc");
  },
  getCoursesByCategory: (category) => {
    const params = {
      maDanhMuc: category,
      maNhom: "GP01",
    };
    return axiosClient.get("/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc", { params });
  },
};
export default coursesAPI;

//Cách sử dụng
// import coursesAPI from "src/Services/coursesAPI"; 
// const {data} = await coursesAPI.getCourses();
