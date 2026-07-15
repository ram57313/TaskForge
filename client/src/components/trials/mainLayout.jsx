import { Outlet } from "react-router-dom";
import Plasma from "../plasma/Plasma";

export default function MainLayout() {
  return (
    <div>
        <div style={{ width: "100%", height: "600px", position: "fixed"}}>
          <Plasma
            color="#396e78"
            speed={0.79}
            direction="forward"
            scale={3}
            opacity={0.35}
            mouseInteractive={false}
          />
        </div>

      <Outlet />
    </div>
  );
}
