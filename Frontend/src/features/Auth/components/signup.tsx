import { useCallback, useState, type FC } from "react";
import { Input, FormElement, Button } from "@kousta-ui/components";
import { FcGoogle } from "react-icons/fc";
import { closeAuthModal, setAuthMode } from "@store/slices/uiSlice";
import { useAppDispatch } from "@store/hooks";
import { login } from "@features/Auth/authSlice";
import { api } from "@utils/ApiInstance";

const SignUp: FC = () => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    birth_day: null,
  });
  const [_, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setForm((prev) => ({ ...prev, [name]: value }));
    },
    [form],
  );

  const signup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("auth/sigin", form);

      if (response.status === 200) {
        dispatch(login({ user: response.data.user }));
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
      <form onSubmit={signup} className="space-y-4">
        <FormElement>
          <Input
            label="Email"
            placeholder="email"
            name="email"
            type="text"
            value={form.email}
            onChange={onChange}
          />
        </FormElement>
        <FormElement>
          <Input
            label="Username"
            placeholder="username"
            name="username"
            type="text"
            value={form.username}
            onChange={onChange}
          />
        </FormElement>
        <FormElement>
          <Input
            label="Password"
            placeholder="password"
            name="password"
            type="text"
            value={form.password}
            onChange={onChange}
          />
        </FormElement>
        <FormElement>
          <Input
            label="Birth Day"
            name="birth_day"
            type="date"
            value={form.birth_day}
            onChange={onChange}
          />
        </FormElement>
        <Button
          style={{ width: "100%", borderRadius: 2000 }}
          type="submit"
          size="sm"
          loading={loading}
        >
          Sign Up
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
                  <span>Sign up with Google</span>
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
                  <span>Sign up with Amazon</span>
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
                  <span>Sign up with Apple</span>
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
                  dispatch(setAuthMode("signup"));
                }}
                variant="primary-link"
                type="submit"
                size="sm"
              >
                Have an account? Login
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
