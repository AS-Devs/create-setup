import { atom } from 'recoil';
import { MessagePattern } from '../../types/message';

export const messageLog = atom<MessagePattern[]>({
    key: 'message_log',
    default: [],
});
