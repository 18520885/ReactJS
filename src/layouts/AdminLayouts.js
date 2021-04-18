import React from "react";
import { Link } from "react-router-dom";

export default function AdminLayouts({ children }) {
  return (
    <div className="d-flex">
      {/* Side bar */}
      <div className="w-25">
        <h3>Cyberlearn</h3>
        <Link to="/admin/courses">Courses</Link>
        <Link to="/admin/users">Users</Link>
      </div>

      {/* Content */}
      <div className="w-75">{children}</div>
    </div>
  );
}
