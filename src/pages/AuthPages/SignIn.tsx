import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta title="Sign-in Page" description="Sign-in Page" />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
