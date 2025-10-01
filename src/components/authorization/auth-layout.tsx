import type React from "react";
import Logo from "../icons/logo";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[440px] space-y-6 rounded-[6px] bg-card p-8">
      <div className="flex justify-center">
        <Logo />
      </div>
      {children}
    </div>
  );
}

export default AuthLayout;
