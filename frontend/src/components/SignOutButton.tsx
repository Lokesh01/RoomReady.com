import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import { signOutAPI } from "../apis/auth-api";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(signOutAPI, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken"); //* forcefully run validate token function even if page don't rerender
      showToast({ message: "Signed Out !", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  }

  return <button onClick={handleClick} className="text-blue-600 rounded-md px-3 font-bold bg-white hover:bg-gray-100" >
    Sign Out
  </button>;
};

export default SignOutButton;
