import { useCallback, useState, type FC } from "react";
import axois from "axios";
import { Input, FormElement, Button } from "@kousta-ui/components";
import { FcGoogle } from "react-icons/fc";
import { setAuthMode } from "../../app/slices/uiSlice";
import { useAppDispatch } from "../../app/hooks";

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({ login: "", password: "" });

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setForm((prev) => ({ ...prev, [name]: value }));
    },
    [form],
  );

  const longin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axois.post("http://localhost:4001/auth/login", form);
    console.log({ response });

    const data = response.data;

    console.log(data);
  };

  return (
    <div>
      <form onSubmit={longin} className="space-y-4">
        <FormElement>
          <Input
            label="Username / Email"
            name="login"
            type="text"
            value={form.login}
            onChange={onChange}
          />
        </FormElement>
        <FormElement>
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
          />
        </FormElement>

        <Button
          style={{ width: "100%", borderRadius: 2000 }}
          variant={form.login && form.password ? "primary" : "neutral"}
          type="submit"
          disabled={!form.login || !form.password}
          size="sm"
        >
          Login
        </Button>

        {/* alternative */}

        <div className="mt-4">
          <div
            className={`
relative text-center
after:content-[''] after:absolute after:right-0 after:left-[53%] after:h-[0.5px] after:top-1/2 after:translate-y-1/2 after:bg-gray-300 after:text-red-500
before:content-[''] before:absolute before:right-[53%] before:left-0 before:h-[0.5px] before:top-1/2 before:translate-y-1/2 before:bg-gray-300 before:text-red-500
`}
          >
            <p className="">or</p>
          </div>
          <div className="space-y-2 mt-2">
            <div>
              <Button
                style={{ width: "100%", borderRadius: 2000 }}
                variant="neutral-light"
                type="submit"
                disabled
                size="sm"
              >
                <div className="flex justify-center items-center gap-2">
                  <FcGoogle size={16} />
                  <span>Continue with Google</span>
                </div>
              </Button>
            </div>
            <div>
              <Button
                style={{ width: "100%", borderRadius: 2000 }}
                variant="neutral-light"
                type="submit"
                disabled
                size="sm"
              >
                <div className="flex justify-center items-center gap-2">
                  <span>Continue with Amazon</span>
                </div>
              </Button>
            </div>
            <div>
              <Button
                style={{ width: "100%", borderRadius: 2000 }}
                variant="neutral-light"
                type="submit"
                disabled
                size="sm"
              >
                <div className="flex justify-center items-center gap-2">
                  <span>Continue with Apple</span>
                </div>
              </Button>
            </div>
            <div>
              <Button
                style={{
                  width: "100%",
                  borderRadius: 2000,
                  color: "var(--kui-primary-600)",
                }}
                onClick={() => {
                  dispatch(setAuthMode("signin"));
                }}
                variant="neutral-light"
                type="submit"
                size="sm"
              >
                Don't have an account? Sign up
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
