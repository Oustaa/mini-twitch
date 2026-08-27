import { useCallback, useState, type FC } from "react";
import { Input, FormElement, Button } from "@kousta-ui/components";
import { useDebounceCallback } from "@kousta-ui/hooks";
import { FcGoogle } from "react-icons/fc";
import { closeAuthModal, setAuthMode } from "@store/slices/uiSlice";
import { useAppDispatch } from "@store/hooks";
import { api } from "@utils/ApiInstance";
import { toBackEndTime } from "@/utils/date-time";
import { getValidateUsername } from "../_requests";
import Alert from "@/components/Alert";
import axios from "axios";

const SignUp: FC = () => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    birth_day: null,
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const verifyUsername = getValidateUsername();

  const [usernameError, setUsernameError] = useState<string | null>(null);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setForm((prev) => ({ ...prev, [name]: value }));
    },
    [form],
  );

  const debounceUsernameCheck = useDebounceCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e);
      try {
        await verifyUsername(e.target.value);

        setUsernameError(null);
      } catch (error) {
        if (error.status) {
          setUsernameError(error.response.data.message);
        }
      }
    },

    300,
  );

  const signup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("auth/signup", {
        ...form,
        birth_day: toBackEndTime(new Date(form.birth_day)),
      });

      if (response.status === 200) {
        setError(null);
        dispatch(setAuthMode("signedup"));
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(
          err.response.data?.message ??
            "Something went wrong. Please try again.",
        );
      } else {
        setError("Network error. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        {error && <Alert type="Error" title={error} />}

        <form onSubmit={signup} className="space-y-4">
          <FormElement>
            <Input
              label="Username"
              placeholder="username"
              name="username"
              type="text"
              onChange={debounceUsernameCheck}
              errors={usernameError ? [usernameError] : null}
            />
          </FormElement>
          <FormElement>
            <Input
              label="Email"
              placeholder="email@abc.def"
              name="email"
              type="email"
              value={form.email}
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
            disabled={!!usernameError}
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
                    dispatch(setAuthMode("login"));
                  }}
                  variant="primary-link"
                  type="button"
                  size="sm"
                >
                  Have an account? Login
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
