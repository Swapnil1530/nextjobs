import Logout from "@/components/Logout";
import NewJobForm from "@/components/NewJobForm";

import { authOptions } from "@/lib/authOption";
import { getServerSession } from "next-auth";

import React from "react";

const PostPage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <>
      <NewJobForm />
    </>
  );
};

export default PostPage;
