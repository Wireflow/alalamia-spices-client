import SignInForm from "../forms/SignInForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const SignIn = () => {
  return (
    <div className="flex justify-center flex-col h-[700px]  items-center ">
      <Card className="w-full max-w-[400px]">
        <CardHeader>
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
