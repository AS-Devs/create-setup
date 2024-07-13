import React from 'react';
import { BsInfo } from 'react-icons/bs';
import Messages from './Messages';
import ChatInput from './ChatInput';
import { ChatContextProvider } from './ChatContext';

function MainChat() {
    return (
        <div className="main-chat-container">
            <header className="w-full bg-gray-100 px-8 py-4 flex rounded-t-[14px] justify-between items-center drop-shadow-md border-b-1">
                <h2 className="text-xl mr-2 font-bold">AI ChatBot</h2>
                <button className="p-1 rounded-md bg-gray-300">
                    <BsInfo className="w-4 h-4" />
                </button>
            </header>
            <ChatContextProvider>
                <div className="relative h-[calc(100vh-2.5rem-60px)] bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2 rounded-b-[14px]">
                    <div className="flex-1 justify-between flex flex-col mb-30">
                        <Messages />
                    </div>

                    <ChatInput />
                </div>
            </ChatContextProvider>
        </div>
    );
}

export default MainChat;
