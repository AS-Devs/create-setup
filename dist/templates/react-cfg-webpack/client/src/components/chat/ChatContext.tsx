import { formState } from '@/stores/atoms/formAtom';
import { MessagePattern, ResponsePattern } from '@/types/message';
import { useInsight } from '@semoss/sdk-react';
import React, { Children, ReactNode, createContext, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { messageLog } from '@/stores/atoms/message';
import toast from 'react-hot-toast';

type Response = {
    message: string;
    handleInputChange: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
    isLoading: boolean;
    addMessage: () => void;
};

export const ChatContext = createContext<Response>({
    addMessage: async () => {},
    message: '',
    handleInputChange: () => {},
    isLoading: false,
});

type Props = {
    children: ReactNode;
};

export const ChatContextProvider = ({ children }: Props) => {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { actions, insightId } = useInsight();
    const formData = useRecoilValue(formState);
    const [olderLog, setMessageLog] = useRecoilState(messageLog);

    const backupMessage = useRef('');
    let oldMessage: MessagePattern[] = [];

    const ask = async (question: string) => {
        setMessage('');
        if (!formData.modelID) {
            throw new Error('Please choose Model Engine ID first.');
        }
        const { pixelReturn } = await actions.run(
            `LLM(engine=["${formData.modelID}"], command=["<encode>${question}</encode>"]);`,
        );
        // get the message
        const { output, operationType } = pixelReturn[0];


        if (operationType.indexOf('ERROR') > -1) {
            throw new Error(output as string);
        } else {
            const result = output as ResponsePattern;
            return result;
        }
    };

    // Ask Function replaced with python code
    const askPy = async (question: string) => {
        setMessage('');
        if (!formData.modelID) {
            throw new Error('Please choose Model Engine ID first.');
        }
        const payload = {
            engineID: formData.modelID,
            question: question,
            insightID: insightId,
        };

        const { pixelReturn } = await actions.run(
            `LoadPyFromFile(filePath=["version/assets/py/sample.py"], space=["${process.env.APPID}"], alias=["ml"]);`,
        );
        const { operationType, output } = pixelReturn[0];

        if (operationType.indexOf('ERROR') > -1) {
            toast.error('Error in loading python file');
            throw new Error(output as string);
        }
        const { output: data } = await actions.runPy(
            `ml.Sample().ask_question(${JSON.stringify(payload)})`,
        );

        return data[0].output;
    };

    const sendMessage = async ({ message }) => {
        setIsLoading(true);
        // Send the message to the bot
        // console.log(message);
        backupMessage.current = message;
        oldMessage = [
            {
                createdAt: new Date().toISOString(),
                id: Math.random().toString(),
                text: message,
                isUserMessage: true,
            },
            ...olderLog,
        ];

        setMessageLog(oldMessage);

        askPy(message)
            .then((result) => {
                if (!result) {
                    setIsLoading(false);
                    toast.error('An error occurred after py call');
                    return;
                }
                const parsedResult = JSON.parse(result) as ResponsePattern;
                const newMessage = [
                    {
                        createdAt: new Date().toISOString(),
                        id: parsedResult.messageId,
                        text: parsedResult.response,
                        isUserMessage: false,
                    },
                    ...oldMessage,
                ];

                setIsLoading(false);
                setMessageLog(newMessage);
            })
            .catch((error) => {
                setMessage(backupMessage.current);
                setIsLoading(false);
                // setMessageLog(olderLog);
                toast.error(error);
            });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    const addMessage = () => sendMessage({ message });

    return (
        <ChatContext.Provider
            value={{
                addMessage,
                message,
                handleInputChange,
                isLoading,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};
