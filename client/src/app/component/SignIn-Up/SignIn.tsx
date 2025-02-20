import { loginUserAction } from "../../../actions/auth-actions";
import React, { useActionState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { SubmitButton } from "../submit-button";

interface SignInProps {
  loginData: {
    userName: string;
    passWord: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  toggleAuthMode: () => void;
}
const INITIAL_STATE = null;
const SignIn = ({
  loginData,
  handleChange,
  handleSubmit,
  toggleAuthMode,
}: SignInProps) => {
  const [formState, formAction] = useActionState(
    loginUserAction,
    INITIAL_STATE
  );
  return (
    <form action={formAction}>
      <div className="flex flex-col gap-5">
        <p className="text-3xl">Sign in to get started!</p>
        <div className="flex flex-col gap-5">
          <input
            className="p-2 border rounded-lg input-field"
            placeholder="User Name"
            name="userName"
            value={loginData.userName}
            onChange={handleChange}
          />
          <input
            className="p-2 border rounded-lg input-field"
            type="password"
            placeholder="Password"
            name="passWord"
            value={loginData.passWord}
            onChange={handleChange}
          />
        </div>
        <SubmitButton
          text="Login"
          loadingText="Loading"
          className="bg-[#25262F] text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        ></SubmitButton>
        <SignupButton />
        <div className="flex justify-around">
          <p className="text-sm text-gray-700 cursor-pointer hover:underline">
            Forgot Your Password?
          </p>
          <p
            className="text-sm text-gray-700 cursor-pointer hover:underline"
            onClick={toggleAuthMode}
          >
            Don't have an account? Sign Up
          </p>
        </div>
      </div>
    </form>
  );
};

export default SignIn;

export function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <button aria-disabled={pending} type="submit" className="mt-2 w-full">
      {pending ? "Submitting..." : "Login"}
    </button>
  );
}
