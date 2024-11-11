import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/src/api/auth";

export const useRegister = () => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log(data, "success");
      //TODO: Redirect to account confirmation page
    },

    onError: (error) => {
      console.log(error, "error");
    },
  });
};
