import React, { useContext } from 'react';
import Message from './Message';
import { LuMessageSquare } from 'react-icons/lu';
import { ChatContext } from './ChatContext';
import { useRecoilValue } from 'recoil';
import { messageLog } from '@/stores/atoms/message';
import { Loader2 } from 'lucide-react';

function Messages() {
    const { isLoading: isAiThinking } = useContext(ChatContext);
    const messages = useRecoilValue(messageLog);

    const loadingMessage = {
        createdAt: new Date().toISOString(),
        id: 'loading-message' + Math.random().toLocaleString(),
        isUserMessage: false,
        text: (
            <span className="flex h-hull items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin" />
            </span>
        ),
    };

    const combindMessages = [
        ...(isAiThinking ? [loadingMessage] : []),
        ...(messages ?? []),
    ];

    return (
        <div className="max-h-[calc(100vh-6rem-7rem)] w-[900px] mx-auto overflow-y-auto border-zinc-200 p-3 scrollbar scrollbar-thumb-slate-700 scrollbar-thumb-rounded scrollbar-track-slate-300 scrollbar-w-2 scrolling-touch flex flex-1 flex-col-reverse gap-4">
            {combindMessages && combindMessages.length ? (
                combindMessages.map((message, i) => {
                    const isNextMessageSamePerson =
                        combindMessages[i - 1]?.isUserMessage ===
                        combindMessages[i]?.isUserMessage;
                    return (
                        <div className="w-full">
                            <Message
                                message={message}
                                isNextMessageSamePerson={isNextMessageSamePerson}
                                key={message.id}
                            />
                        </div>
                    );
                })
            ) : (
                <div className="flex-1 flex flex-col gap-2 items-center justify-center">
                    <LuMessageSquare className="h-8 w-8 text-primary" />
                    <h3 className="font-semibold text-xl">You're all set!</h3>
                    <p className="text-zinc-500 text-sm">
                        Ask your first question to get started.
                    </p>
                </div>
            )}
        </div>
    );
}

export default Messages;
