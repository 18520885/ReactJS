import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { lazy, Suspense } from "react";

//Pages
// import Home from "./Pages/Home";
// import Courses from "./Pages/Courses";
// import Course from "./Pages/Course";

// import AdminCourses from "./Pages/AdminCourses";
// import AdminUsers from "./Pages/AdminUsers";
// import LoginPage from "./Pages/LoginPage";
import AdminRoute from "src/Auth/AdminRoute";
//Layout
import AppLayout from "./Components/Layouts/AppLayout";
import AdminLayouts from "./layouts/AdminLayouts";

//Sử dụng lazy Load không import trực tiếp Pages vào => đẩy nhanh tốc độ load trang
const Home = lazy(() => import("./Pages/Home"));
const Courses = lazy(() => import("./Pages/Courses"));
const Course = lazy(() => import("./Pages/Course"));
const AdminCourses = lazy(() => import("./Pages/AdminCourses"));
const AdminUsers = lazy(() => import("./Pages/AdminUsers"));
const LoginPage = lazy(() => import("./Pages/LoginPage"));


function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Switch>
          {/* Kiểm tra chính xác đường dẫn nếu là /admin thì sẽ load tới trang /admin/courses */}
          <Redirect exact from="/admin" to="/admin/courses" />
          {/* Route Admin */}
          <Route path="/admin">
            <AdminLayouts>
              <Switch>
                <AdminRoute path="/admin/courses">
                  <AdminCourses />
                </AdminRoute>
                <AdminRoute path="/admin/users">
                  <AdminUsers />
                </AdminRoute>
              </Switch>
            </AdminLayouts>
          </Route>
          {/* Route Main */}
          <Route path="/">
            <AppLayout>
              <Switch>
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/courses/:category">
                  <Courses />
                </Route>
                <Route path="/course/:category">
                  <Course />
                </Route>
                <Route path="/login">
                  <LoginPage />
                </Route>
              </Switch>
            </AppLayout>
          </Route>
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
