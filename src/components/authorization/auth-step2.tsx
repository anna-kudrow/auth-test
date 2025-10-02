import Heading3 from "../shared/heading3";
import AuthLayout from "./auth-layout";

function AuthStep2() {
  return (
    <AuthLayout>
      <Heading3 className="mb-4">Two-Factor Authentication</Heading3>
      <p className="mb-7">
        Enter the 6-digit code from the Google <br /> Authenticator app
      </p>
    </AuthLayout>
  );
}

export default AuthStep2;
