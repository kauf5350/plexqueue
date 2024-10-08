import SignInForm from "@/components/SignInForm";
import AuthLayout from "@/components/AuthLayout";
import { Message } from "@/components/form-message";

export default function SignInPage({ searchParams }: { searchParams: Message }) {
  return (
    <AuthLayout>
      <SignInForm searchParams={searchParams} />
    </AuthLayout>
  );
}