import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCoursesByCategory } from "src/actions/courses";
import { useDispatch, useSelector } from "react-redux";

export default function Courses() {
  const dispatch = useDispatch();
  const { category } = useParams();
  const { courses, isLoading, error } = useSelector((state) => state.courses);

  console.log(courses);
  //Được chạy mỗi khi category thay đổi
  useEffect(() => {
    //dispatch action gọi API lấy Danh sách khóa học
    dispatch(getCoursesByCategory(category));
  }, [category]);

  return (
    <div>
      <h1>Courses list by category</h1>
    </div>
  );
}
