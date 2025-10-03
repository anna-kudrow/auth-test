import type React from "react";
import Logo from "../shared/logo";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[440px] rounded-[6px] bg-card p-8">
      <div className="mb-6 flex justify-center">
        <Logo />
      </div>
      {children}
    </div>
  );
}

export default AuthLayout;
