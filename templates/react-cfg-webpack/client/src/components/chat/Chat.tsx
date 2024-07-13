import Sidebar from '@/components/chat/Sidebar';
import MainChat from "@/components/chat/MainChat";

export const NewChat = () => {
    return (
        <div className="p-5 bg-[#25252d] h-screen w-screen">
            <div className='main-grid'>
                <Sidebar />
                <MainChat />
            </div>
        </div>
    );
};
