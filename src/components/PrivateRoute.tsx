
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/sign-in", { replace: true });
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-skill-primary" />
      </div>
    );
  }

  return isSignedIn ? <>{children}</> : null;
};

export default PrivateRoute;
