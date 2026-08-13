import { type FC } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setAuthMode } from "../../app/slices/uiSlice";

const Signin: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>Signin</h2>
      <button
        onClick={() => {
          dispatch(setAuthMode("login"));
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Signin;
