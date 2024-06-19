"use client";

import MessageCard from "@/components/MessageCard";
import SendMessage from "@/components/SendMessage";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-separator";
import axios from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Dashboard = () => {
  const { data: session } = useSession();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const { toast } = useToast();

  const handleDeleteMessage = (messageId) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;

  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessages);
    } catch (error) {
      toast({
        title: "Failed to fetch messages settings",
        variant: "destructive",
        description: error.response?.data.message,
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh) => {
      setLoading(true);
      try {
        const response = await axios.get("/api/get-messages");
        setMessages(response.data.messages || []);

        if (refresh) {
          toast({
            title: "Refreshed messages",
            description: "Showing latest messages",
          });
        }
      } catch (error) {
        toast({
          title: error.response?.data.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setMessages]
  );

  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessages();
  }, [session, setValue, fetchAcceptMessages, fetchMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });

      setValue("acceptMessages", !acceptMessages);
      toast({
        title: "Message status updated",
      });
    } catch (error) {
      toast({
        title: "Failed to update status",
        variant: "destructive",
        description: error.response?.data.message,
      });
    }
  };

  const { username } = session?.user || "";
  const baseUrl =
    typeof window !== "undefined"
      ? `${location.protocol}//${location.host}`
      : null;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard
        .writeText(profileUrl)
        .then(() => {
          toast({
            title: "URL copied",
            description: "Profile URL has been copied to clipboard",
          });
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
          toast({
            title: "Copy failed",
            description: "Could not copy the profile URL to clipboard",
          });
        });
    } else {
      console.error("Clipboard API not available");
      toast({
        title: "Copy failed",
        description: "Something went wrong",
      });
    }
  };

  if (!session || !session?.user) return;

  return (
    <div className="lg:mx-auto p-6 w-full max-w-6xl space-y-10">
      <h1 className="text-4xl font-bold">User Dashboard</h1>
        <div>
          <h3 className="text-lg font-semibold mx-3">
            Copy your unique link
          </h3>
          <div className="flex items-center">
            <input
              type="text"
              value={profileUrl}
              disabled
              readOnly
              className="input input-bordered bg-white w-full p-3"
            />
            <Button onClick={copyToClipboard}>Copy</Button>
          </div>
        </div>
          <div className="flex items-center">
            <Switch
              {...register("acceptMessages")}
              checked={acceptMessages}
              onCheckedChange={handleSwitchChange}
              disabled={isSwitchLoading}
            />
            <span className="ml-2">
              Accept Messages: {acceptMessages ? "On" : "Off"}
            </span>
          </div>
        <Separator />

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              fetchMessages(true);
            }}
          >
            {loading ? <Loader2 className="animate-spin" /> : <RefreshCcw />}
          </Button>
          <SendMessage />
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold">
            Your Messages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {messages.length > 0 ? (
              messages.map((message) => (
                <MessageCard
                  key={message._id}
                  message={message}
                  onMessageDelete={handleDeleteMessage}
                />
              ))
            ) : (
              <p>No message to display.</p>
            )}
          </div>
        </div>
    </div>
  );
};

export default Dashboard;
