import React from "react";

const UserPage = ({ params }: { params: { id: string } }) => {
  return <div>{`User id: ${params.id}`}</div>;
};

export default UserPage;
