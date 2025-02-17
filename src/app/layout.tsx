import { Outlet } from "react-router-dom";
import "./global.scss";

export default function Layout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}
