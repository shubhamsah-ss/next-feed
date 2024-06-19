"use client"
import isValidUrl from '@/lib/isValidUrl';
import { Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';

const SendMessage = () => {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const input = searchInput.trim();
    if (isValidUrl(input)) router.push(input);
    else if (input.startsWith("@")) {
      const username = input.slice(1);
      router.push(`/u/${username}`);
    } else router.push(`/u/${input}`)
  };
  return (
    <Dialog>
          <DialogTrigger asChild>
            <Button>Send your mysterious message</Button>
          </DialogTrigger>
          <DialogContent className="rounded-md max-w-sm md:w-full md:max-w-lg">
            <DialogHeader>
              <DialogDescription>Profile link or @username</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col md:flex-row gap-2 items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Input
                  id="search"
                  name="search"
                  onChange={(e) => setSearchInput(e.target.value)}
                  value={searchInput}
                />
              </div>
              <Button
                onClick={() => handleSearch()}
                type="submit"
                size="sm"
                className="px-3"
              >
                <Send className="h-4 w-4 mr-2" />
                <span className="">Send</span>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
  )
}

export default SendMessage