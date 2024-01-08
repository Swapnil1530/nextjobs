import Logout from "@/components/Logout";

import { authOptions } from "@/lib/authOption";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import React from "react";

const PostPage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <div>
      <h1>Post Page</h1>
      <p>{user?.id}</p>
      <p>{user?.email}</p>
      <p>{user?.name}</p>
      <p>{user?.role}</p>
      <Logout />
    </div>
  );
};

export default PostPage;
