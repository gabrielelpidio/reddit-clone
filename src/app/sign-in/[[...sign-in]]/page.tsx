import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="grid min-h-[100dvh] place-items-center">
      <SignIn />;
    </div>
  );
}
