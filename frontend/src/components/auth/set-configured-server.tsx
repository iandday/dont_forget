import { Button } from "@/components/custom/button";
import { Alert, AlertActions, AlertDescription, AlertTitle } from "@/components/alert";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/input";
import useLocalStorageState from "@/hooks/use-local-storage";
import { useEffect } from "react";
const formSchema = z.object({
  url: z.string().min(1, { message: "Please enter your backend server's URL" }),
});

interface ConfiguredServerProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}
export default function SetConfiguredServer({
  isLoading,
  setIsLoading,
  showModal,
  setShowModal,
}: ConfiguredServerProps) {
  const [baseUrl, setBaseUrl] = useLocalStorageState("base_url", "");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setBaseUrl(data.url);
    setIsLoading(false);
    setShowModal(false);
  }

  return (
    <Alert
      open={showModal}
      onClose={setShowModal}
    >
      <AlertTitle>Set Base URL</AlertTitle>
      <AlertDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid gap-2'>
              <FormField
                control={form.control}
                name='url'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='https://dontforget.domain.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className='mt-2'
                loading={isLoading}
              >
                Save
              </Button>

              <div className='relative my-2'>
                <div className='absolute inset-0 flex items-center'>
                  <span className='w-full border-t' />
                </div>
              </div>
            </div>
          </form>
        </Form>
      </AlertDescription>
      <AlertActions>
        <Button
          plain
          onClick={() => setShowModal(false)}
        >
          Cancel
        </Button>
      </AlertActions>
    </Alert>
  );
}
