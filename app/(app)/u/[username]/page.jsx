"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Message = ({ params }) => {
  const [isSending, setIsSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const { username } = params;

  const { register, handleSubmit, setValue } = useForm();

  const handleSendMessage = async (data) => {
    setIsSending(true);
    try {
      const response = await axios.post("/api/send-message", {
        username,
        content: data.content,
      });
      toast({
        title: response?.data.message,
      });
    } catch (error) {
      toast({
        title: error.response?.data.message,
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
      setValue("");
    }
  };

  const handleSuggestMessage = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/suggest-messages");
      setSuggestions(response.data.message.split("||"));
    } catch (error) {
      toast({
        title: error.response?.data.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="my-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl space-y-5">
        <h3 className="text-lg font-semibold">Send your message</h3>
        <form
          onSubmit={handleSubmit(handleSendMessage)}
          className="flex flex-col gap-6 md:flex-row items-center justify-between"
        >
          <Textarea
            placeholder="Type your message here."
            className="w-full"
            rows="10"
            name="content"
            {...register("content")}
          />
          <Button type="submit">
            {isSending ? (
              <>
                <Loader2 className="mr-2 animate-spin" /> sending...
              </>
            ) : (
              <p>Send message</p>
            )}
          </Button>
        </form>
      </div>
      <div className="p-6 space-y-10">
        <Button onClick={handleSuggestMessage} disabled={loading}>
          Suggest message
        </Button>

        {loading ? (
          <Card className="lg:max-w-4xl mx-auto">
            <CardContent className="p-6 space-y-7">
              {
                Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton className="w-full mx-auto h-10" />
                ))
              }
            </CardContent>
          </Card>
        ) : suggestions && suggestions.length > 0  && (
          <Card className="lg:max-w-4xl mx-auto">
            <CardContent className="p-6 space-y-7">
              {suggestions.map((suggestion, i) => (
                <Button
                  key={i}
                  onClick={() => setValue("content", suggestion)}
                  className="mx-auto w-full bg-white outline outline-1 outline-slate-200 hover:bg-gray-100 text-black text-wrap text-xs md:text-base"
                >
                  {suggestion}
                </Button>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Message;
