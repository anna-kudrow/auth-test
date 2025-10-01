import type React from "react";
import Logo from "../shared/logo";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-fit rounded-[6px] bg-card p-8 max-w-md space-y-6">
      <div className="flex justify-center py-5">
        <Logo />
      </div>
      {children}
    </div>
  );
}

export default AuthLayout;
