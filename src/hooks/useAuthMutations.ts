import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { signin, signup } from "@/utils/quries/auth";

export const useSigninMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signin,
    onSuccess: () => {
      toast.success("Account created successfully");
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Account created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
