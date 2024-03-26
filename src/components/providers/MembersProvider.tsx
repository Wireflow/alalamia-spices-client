import fetchAllMembers from "@/use-cases/fetchAllMembers";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";

type Props = {
  children: React.ReactNode;
};
const MembersProvider = ({ children }: Props) => {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ["members"],
    queryFn: fetchAllMembers,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default MembersProvider;
