import { useEffect } from "react";
import { useAxiosPrivate, useLogout } from "hooks";
import "./Dashboard.scss";

export default function Dashboard() {
  const logout = useLogout();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get("/user", {
        withCredentials: true,
      })
      .then(() => {});
  }, []);
  return (
    <div className="dashboard">
      Dashboard
      <button onClick={() => logout()}>Sign Out</button>
    </div>
  );
}
