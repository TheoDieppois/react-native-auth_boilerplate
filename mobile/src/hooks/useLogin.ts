import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "@/src/components/AuthProvider";
import { signIn } from "@/src/api/auth";

export const useLogin = () => {
  const { signIn: storeUserInContext } = useAuthContext();

  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      storeUserInContext({
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
        user: data.data.user,
      });
    },
    onError: (error) => {
      console.log(error, "error");
      // TODO: Handle error with toast
    },
  });
};
