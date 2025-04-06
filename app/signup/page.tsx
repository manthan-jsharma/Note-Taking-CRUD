import SignupForm from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create an Account
        </h1>
        <SignupForm />
      </div>
    </div>
  );
}
