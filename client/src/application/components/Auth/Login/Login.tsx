import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { axios } from "services";
import "./Login.scss";

import { Form, Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { api } from "services";
import apiRoutes from "configs/apiRoutes";
import useAuth from "hooks/useAuth";

export default function Login() {
  const { setAuth } = useAuth();

  async function onFinish(values: any) {
    console.log(values);
    const data = JSON.stringify({
      email: values.email,
      password: values.password,
    });

    const response = await axios.post(apiRoutes.APP_AUTH_LOGIN.url, data, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });

    setAuth({
      id: response.data.id,
      email: response.data.emil,
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      isLogged: true,
    });
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="E-mail"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <Link to="/auth/register">register now!</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
