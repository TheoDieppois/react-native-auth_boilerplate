import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "@/src/components/AuthProvider";
import { signOut } from "@/src/api/auth";

export const useLogout = () => {
  const { signOut: removeUserFromContext } = useAuthContext();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      removeUserFromContext();
    },
    onError: (error) => {
      console.log(error, "error");
      // TODO: Handle error with toast
    },
  });
};
