"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Profile = () => {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = session?.user || "";

  const form = useForm({
    // resolver: zodResolver(),
    defaultValues: {
      username: user.username,
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/sign-up", data);
      toast({
        title: "Success",
        description: response.data.message,
      });
    } catch (error) {
      toast({
        title: "Sign up failed",
        variant: "destructive",
        description: error.response?.data.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    form.reset({
      ...user,
    });
  }, [session, form]);

  if (!session || !session?.user) return;

  return (
    <div className="lg:mx-auto p-6 w-full max-w-6xl space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Profile</h1>
        <Button
          className="bg-red-500 text-white hover:bg-red-700"
          onClick={() => signOut()}
        >
          Logout
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          <FormField
            name="username"
            disabled
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            disabled
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="isVerified"
            disabled
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ? "Verified" : "Not verified"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="col-span-2 mx-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
              </span>
            ) : (
              <p>Update (in development)</p>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Profile;
