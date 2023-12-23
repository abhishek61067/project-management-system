"use client";
import { UserButton, auth, currentUser, useAuth, useUser } from "@clerk/nextjs";

const ProtectedPage = () => {
  const { user } = useUser();
  const { userId } = useAuth();
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      
    </div>
  );
};
export default ProtectedPage;
