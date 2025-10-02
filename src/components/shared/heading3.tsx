import { cn } from "@/lib/utils";

function Heading3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h1 className={cn("text-center text-2xl", className)}>{children}</h1>;
}

export default Heading3;
