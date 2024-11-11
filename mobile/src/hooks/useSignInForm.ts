import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormData, SignInSchema } from "@/src/validators/signIn";

export const useSignInForm = () => {
  return useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
  });
};
