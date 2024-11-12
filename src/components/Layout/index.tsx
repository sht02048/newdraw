import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="h-screen space-y-10 overflow-hidden bg-zinc-200">
      {children}
    </div>
  );
}
