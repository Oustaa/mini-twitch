import { useAppDispatch } from "@/store/hooks";
import { setAuthMode } from "@/store/slices/uiSlice";
import { Button } from "@kousta-ui/components";
import { FaCheck } from "react-icons/fa";

const SignupSuccess = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="space-y-4">
      <div className="mx-auto aspect-square w-min p-4 border-4 rounded-full border-green-600">
        <FaCheck className="text-green-600" size={32} />
      </div>
      <div className="text-center space-y-1">
        <h2 className="text-md">You have been logged in Successfully</h2>
        <p className="text-sm">
          Check Your Email To comfirm That it belongs to you.
        </p>
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
          variant="primary"
        >
          Login to your account
        </Button>
      </div>
    </div>
  );
};

export default SignupSuccess;
