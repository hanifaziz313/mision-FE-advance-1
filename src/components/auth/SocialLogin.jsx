import { FcGoogle } from "react-icons/fc";
import Button from "../common/Button";
import Divider from "@/components/Divider";

const SocialLogin = ({ onGoogleLogin }) => {
  return (
    <>
      <Divider text="Atau" />
      <Button type="button" onClick={onGoogleLogin} className="w-full flex items-center justify-center">
        <FcGoogle className="mr-2 text-xl" />
        <span>Masuk dengan Google</span>
      </Button>
    </>
  );
};

export default SocialLogin;
