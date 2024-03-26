import { getSession, signIn } from "@/hooks/useAuth";
import { SignInType, UserSchema } from "@/types/user";
import signInUser from "@/use-cases/signInUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const SignInForm = () => {
  const navigate = useNavigate();
  const session = getSession();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: signInUser,
    onSuccess: (data) => {
      if (data?.token && data?.session) {
        signIn({ token: data.token, session: data.session });
        toast.success("Signed in Successfully");
        navigate("/home");
      }
    },
    onError: () => {
      toast.error("Error Logging in");
    },
  });

  const form = useForm<SignInType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInType) => {
    mutate(data);
  };

  useEffect(() => {
    if (session) {
      navigate("/home");
    }
  }, [session, navigate, isSuccess]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="johndoe@email.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Your password"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full mt-4" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
