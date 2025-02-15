import { Outlet } from "react-router-dom";
import "./global.scss";

export default function Layout() {
  return (
    <html lang="en">
      <body>
        <Outlet />
      </body>
    </html>
  );
}
