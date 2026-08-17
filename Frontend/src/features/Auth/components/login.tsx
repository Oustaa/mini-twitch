import { useCallback, useState, type FC } from "react";
import { Input, FormElement, Button } from "@kousta-ui/components";
import { FcGoogle } from "react-icons/fc";
import { closeAuthModal, setAuthMode } from "@store/slices/uiSlice";
import { useAppDispatch } from "@store/hooks";
import { login } from "@features/Auth/authSlice";
import { api } from "@utils/ApiInstance";

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({ login: "", password: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setForm((prev) => ({ ...prev, [name]: value }));
    },
    [form],
  );

  const longin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("auth/login", form);

      console.log(response.data);
      if (response.status === 200) {
        dispatch(login({ user: response.data }));
        dispatch(closeAuthModal());
      }
    } catch (e) {
      console.log(e);
      setError(e.response.data.body.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={longin} className="space-y-4">
        <FormElement>
          <Input
            label="Log in"
            placeholder="Username / Email"
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
            placeholder="password"
            value={form.password}
            onChange={onChange}
          />
        </FormElement>
        {error && (
          <div className="bg-red-50 p-2 rounded-sm">
            <span className="text-sm text-red-500">{error}</span>
          </div>
        )}
        <Button
          style={{ width: "100%", borderRadius: 2000 }}
          variant={form.login && form.password ? "primary" : "neutral"}
          type="submit"
          disabled={!form.login || !form.password}
          size="sm"
          loading={loading}
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
                type="button"
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
                type="button"
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
                type="button"
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
                }}
                onClick={() => {
                  dispatch(setAuthMode("signin"));
                }}
                variant="primary-link"
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
