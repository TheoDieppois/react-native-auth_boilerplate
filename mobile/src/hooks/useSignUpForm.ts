import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormData, SignUpSchema } from "@/src/validators/signUp";

export const useSignUpForm = () => {
  return useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
  });
};
