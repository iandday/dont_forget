import SetConfiguredServer from "@/components/auth/set-configured-server";
import { UserAuthForm } from "@/components/auth/user-auth-form";
import { Button } from "@/components/custom/button";
import { Card, CardContent, CardTitle } from "@/components/card";
import { ReactComponent as Logo } from "@/assets/logo.svg";
import useLocalStorageState from "@/hooks/use-local-storage";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [showModal, setShowModal] = React.useState(false);
  const [baseUrl, setBaseUrl] = useLocalStorageState("base_url", "");
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <>
      <div className='flex max-w-full max-h-full justify-center px-6 py-12 lg:px-8'>
        <Card>
          <CardTitle>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm p-6'>
              <img
                className='mx-auto h-10 w-auto'
                src='/logo.svg'
              />
              <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight '>
                Sign in to your account
              </h2>
            </div>
          </CardTitle>
          <CardContent>
            <UserAuthForm />
            <p className='mt-1 px-3 text-center text-sm'>
              <Button
                className='mt-2'
                loading={isLoading}
                onClick={() => setShowModal(true)}
                variant='secondary'
              >
                Configured Server: {baseUrl}
              </Button>
            </p>
            <SetConfiguredServer
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
