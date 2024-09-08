import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../components/InputField";
import Header from "../components/Header";
import apiClient from "../services/Axios";
import { useNavigate, useLocation } from "react-router-dom";
import Cookie from "cookie-universal";
import styles from "./LoginForm.module.scss";
import { v4 as uuidv4 } from "uuid";
import logo from "../assets/logo.svg";
interface LoginFormValues {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("بريد إلكتروني غير صحيح")
    .required("البريد الإلكتروني مطلوب"),
  password: Yup.string().required("كلمة المرور مطلوبة"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const cookie = Cookie();
  const [loading, setLoading] = useState(false);

  // This code to generate dynamic user id but i never use it
  // I use 1231 static user id
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let uid = queryParams.get("uuid");
  if (!uid) {
    uid = uuidv4();
  }

  return (
    <div className={styles.container}>
      <Formik<LoginFormValues>
        initialValues={{ email: "admin@admin.com", password: "12345678" }}
        validationSchema={LoginSchema}
        onSubmit={async (values) => {
          try {
            setLoading(true);
            const response = await apiClient.post(`/login?uid=1231`, {
              email: values.email,
              password: values.password,
              // uid: 1231,
            });
            const token = "one-hand1234";
            cookie.set("token", token);

            navigate("/");
          } catch (error) {
            console.error("Error logging in:", error);
          } finally {
            setLoading(false);
          }
        }}
      >
        {() => (
          <>
            <Header />
            <div className={styles.card}>
              <img src={logo} />

              <h2 className={styles.header}>Log In</h2>

              <Form>
                <div className={styles["form-group"]}>
                  <InputField
                    name="email"
                    type="email"
                    placeholder="Email"
                    label="Email:"
                  />
                </div>
                <div className={styles["form-group"]}>
                  <InputField
                    name="password"
                    type="password"
                    placeholder="Password"
                    label="Password:"
                  />
                </div>
                <button type="submit" disabled={loading}>
                  {loading ? "Wait..." : "Log In"}
                </button>
              </Form>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
};

export default Login;
