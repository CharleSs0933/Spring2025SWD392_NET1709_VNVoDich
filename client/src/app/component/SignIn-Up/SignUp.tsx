import { registerUserAction } from "../../../actions/auth-actions";
import React, { useActionState } from "react";
import { ZodErrors } from "../zod-errors";
import { SubmitButton } from "../submit-button";

interface SignUpProps {
  signUpData: {
    fullName: string;
    userName: string;
    passWord: string;
    confirmPassword: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  toggleAuthMode: () => void;
}
const INITIAL_STATE = null;
const SignUp: React.FC<SignUpProps> = ({
  signUpData,
  handleChange,
  handleSubmit,
  toggleAuthMode,
}) => {
  const [formState, formAction] = useActionState(
    registerUserAction,
    INITIAL_STATE
  );

  console.log("## will render on client ##");
  console.log(formState);
  console.log("###########################");
  return (
    <form action={formAction}>
      <div className="flex flex-col gap-5">
        <p className="text-3xl">Create an Account</p>
        <div className="flex flex-col gap-5">
          <div className="w-full">
            <input
              className="p-2 border rounded-lg w-full input-field"
              placeholder="Full Name"
              name="fullName"
              value={signUpData.fullName}
              onChange={handleChange}
            />
            <ZodErrors error={formState?.zodErrors?.fullName} />
          </div>
          <div>
            <input
              className="p-2 border rounded-lg w-full input-field"
              placeholder="User Name"
              name="userName"
              value={signUpData.userName}
              onChange={handleChange}
            />
            <ZodErrors error={formState?.zodErrors?.userName} />
          </div>
          <div>
            <input
              className="p-2 border rounded-lg w-full input-field"
              type="password"
              placeholder="Password"
              name="passWord"
              value={signUpData.passWord}
              onChange={handleChange}
            />
            <ZodErrors error={formState?.zodErrors?.passWord} />
          </div>
          <div>
            <input
              className="p-2 border rounded-lg w-full input-field"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={signUpData.confirmPassword}
              onChange={handleChange}
            />
            <ZodErrors error={formState?.zodErrors?.confirmPassword} />
          </div>
        </div>
        <SubmitButton text="Sign Up" loadingText="Loading"
          className="bg-[#25262F] text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
        </SubmitButton>
        <button className="bg-white text-black py-2 rounded-lg hover:bg-blue-600 transition duration-300">
          <p className="flex justify-center items-center gap-2">Google</p>
        </button>
        <div className="flex justify-around">
          <p
            className="text-sm text-gray-700 cursor-pointer hover:underline"
            onClick={toggleAuthMode}
          >
            Already have an account? Login
          </p>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
