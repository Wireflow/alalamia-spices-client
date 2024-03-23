import SignInForm from "../forms/SignInForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import signInLogo from "../../assets/signInLogo.png";

const SignIn = () => {
  return (
    <div className="flex justify-center flex-col h-screen  items-center ">
      <Card className="w-full max-w-[400px]">
        <CardHeader className="flex justify-center items-center">
          <img src={signInLogo} alt="Logo" className="w-[150px]" />
          <CardTitle>Welcome back!</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
