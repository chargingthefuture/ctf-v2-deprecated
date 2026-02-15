import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";
import { useState } from "react";

interface ChatBadgeProps {
  testId?: string;
}

const CHAT_EXPLANATION = "Use this chat to receive live assistance from the community.";

export function ChatBadge({ testId }: ChatBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
          aria-label="Learn more about the chat"
          data-testid={testId ? `${testId}-info` : "chat-badge-info"}
        >
          <Info className="w-4 h-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[calc(100vw-2rem)] max-w-sm sm:w-80" 
        side="bottom" 
        align="start"
        sideOffset={8}
        collisionPadding={16}
      >
        <p className="text-sm leading-relaxed">{CHAT_EXPLANATION}</p>
      </PopoverContent>
    </Popover>
  );
}
