"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Card, CardContent, CardDescription } from "@/components/ui/card";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import dateFormat from "@/lib/dateFormat";

const MessageCard = ({ message, onMessageDelete }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`/api/delete-message/${message._id}`);
      toast({
        title: response.data.message,
      });
      onMessageDelete(message._id);
    } catch (error) {
      toast({
        title: "Failed to delete",
        variant: "destructive",
        description: error.response?.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="flex justify-end p-1">
            <X className="text-red-700 hover:cursor-pointer" />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-700"
              onClick={handleDelete}
            >
              {loading ? (
                <span>
                  <Loader2 className="animate-spin" /> Please wait ...
                </span>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <CardContent>
        <p className="text-base font-medium leading-none">
          {(message?.content).toString().charAt(0).toUpperCase() +
            message.content.toString().slice(1)}
        </p>
      </CardContent>
      <CardDescription className="ps-5 pb-5">
        {dateFormat(message.createdAt)}
      </CardDescription>
    </Card>
  );
};

export default MessageCard;
