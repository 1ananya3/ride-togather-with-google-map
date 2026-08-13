import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../features/auth/authSlice";

export default function GoogleLoginButton() {
  const buttonRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiBaseUrl =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    if (!buttonRef.current) {
      return;
    }

    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,

      callback: async (response) => {
        try {
          const res = await fetch(
            `${apiBaseUrl}/api/auth/google`,
            {
              method: "POST",

              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify({
                credential: response.credential,
              }),
            }
          );

          const data = await res.json();

          if (!res.ok) {
            throw new Error(
              data.message || "Google login failed"
            );
          }

          dispatch(
            login({
              user: data.user,
              token: data.token,
            })
          );

          navigate("/home");

        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    });

    google.accounts.id.renderButton(
      buttonRef.current,
      {
        theme: "outline",
        size: "large",
        width: 300,
      }
    );
  }, [dispatch, navigate]);

  return <div ref={buttonRef}></div>;
}