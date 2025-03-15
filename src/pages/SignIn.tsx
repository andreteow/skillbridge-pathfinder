
import { SignIn } from "@clerk/clerk-react";
import Layout from "@/components/Layout";

const SignInPage = () => {
  return (
    <Layout>
      <div className="container mx-auto flex justify-center py-12">
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto w-full max-w-md",
              card: "shadow-lg rounded-xl border border-gray-100",
              headerTitle: "text-2xl font-bold text-center",
              headerSubtitle: "text-center",
              formButtonPrimary: "bg-skill-primary hover:bg-skill-primary/90",
              formFieldInput: "rounded-md border-gray-300 focus:border-skill-primary focus:ring-skill-primary",
              footerActionLink: "text-skill-primary hover:text-skill-primary/90"
            }
          }}
          routing="path"
          path="/sign-in"
        />
      </div>
    </Layout>
  );
};

export default SignInPage;
