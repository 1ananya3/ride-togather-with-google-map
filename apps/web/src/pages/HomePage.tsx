import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import type { RootState } from "../app/store";
import { logout } from "../features/auth/authSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <h1>Ride Together</h1>

      <h2>Welcome, {user?.name}</h2>

      <p>{user?.email}</p>

      {user?.profileImage && (
        <img
          src={user.profileImage}
          alt={user.name}
          width={60}
        />
      )}

      <br />

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}