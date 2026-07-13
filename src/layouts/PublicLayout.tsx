import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PublicLayout({
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-slate-50">
      {children}
    </div>
  );
}
