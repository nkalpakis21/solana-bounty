// 'use client';

// import { useChat, useAssistant } from 'ai/react';
// import { useEffect } from 'react';

// interface ChatProps {
//   setSearchTerm: (term: string) => void;
//   // onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
// }
// export default function Chat({setSearchTerm}: ChatProps) {
//   // USES DEFAULT CHAT
//   // const { messages, input, handleInputChange, handleSubmit } = useChat({ api: '/api/openAI/chat' });

//   // USES ASSISTANT
//   const { status, messages, input, submitMessage, handleInputChange } =
//     useAssistant({ api: '/api/openAI/assistant' });

//   useEffect(() => {
//     // Find the last message from the AI
//     const lastAiMessage = messages
//     .slice()
//     .reverse()
//     .find((m) => m.role !== 'user');
//     setSearchTerm(lastAiMessage?.content || '');

//   }, [messages])
//   return (
//     <div>
//       {/* Render each message from the chat history */}
//       {messages.map((m) => (
//         <div key={m.id}>
//           {/* Show 'User: ' or 'AI: ' based on the role */}
//           {m.role === 'user' ? 'User: ' : 'AI: '}
//           {m.content}
//         </div>
//       ))}

//       {/* Input form for sending a new message */}
//       <form onSubmit={submitMessage}>
//         <input
//           value={input}
//           placeholder="Say something..."
//           onChange={handleInputChange}
//         />
//       </form>
//     </div>
//   );
// }


'use client'

import React, { useEffect } from 'react'
import { useAssistant } from 'ai/react'
import { Send, Github, Book, Code, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ChatProps {
  setSearchTerm: (term: string) => void;
}

export default function Component({ setSearchTerm }: ChatProps) {
  const { status, messages, input, submitMessage, handleInputChange } =
    useAssistant({ api: '/api/openAI/assistant' });

  useEffect(() => {
    // Find the last message from the AI
    const lastAiMessage = messages
      .slice()
      .reverse()
      .find((m) => m.role === 'assistant');
    setSearchTerm(lastAiMessage?.content || '');
  }, [messages, setSearchTerm])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitMessage(e);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-center text-2xl font-bold">
          <Github className="mr-2" />
          Repo Search
        </CardTitle>
        <CardDescription className="text-center">
          Describe your skills, interests, or the type of project you are looking for
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.role === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {message.role === 'assistant' ? (
                  <div>
                    <p className="mb-2">AI-generated search query:</p>
                    <div className="flex flex-wrap gap-2">
                      {message.content.split(' ').map((term, i) => (
                        <Badge key={i} variant="outline">
                          {term.startsWith('language:') ? <Code className="mr-1 h-3 w-3" /> :
                           term.startsWith('topic:') ? <Book className="mr-1 h-3 w-3" /> :
                           <Star className="mr-1 h-3 w-3" />}
                          {term.replace('language:', '').replace('topic:', '')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  message.content
                )}
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex gap-2 w-full">
          <Input
            type="text"
            placeholder="E.g., Python developer interested in AI and web projects about pets"
            value={input}
            onChange={handleInputChange}
            className="flex-grow"
          />
          <Button type="submit" disabled={status === 'in_progress'}>
            <Send className="h-4 w-4 mr-2" />
            {status === 'in_progress' ? 'Searching...' : 'Search'}
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}