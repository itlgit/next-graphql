'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { ApolloProvider } from '@apollo/client/react';
import client from '../gql/apollo-client';
import MainLayout from './main-layout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ApolloProvider client={client}>
        <MainLayout>{children}</MainLayout>
      </ApolloProvider>
    </SessionProvider>
  );
}
