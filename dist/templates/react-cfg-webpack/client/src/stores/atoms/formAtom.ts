import { Model, formSchema } from '@/types/message';
import { atom } from 'recoil';
import { z } from 'zod';

export const DEFAULT_FORM = {
    serverURL: '',
    secretKey: '',
    accessKey: '',
    modelID: '',
};

export const formState = atom<z.infer<typeof formSchema>>({
    key: 'formData',
    default: DEFAULT_FORM,
});

export const formSubmitState = atom({
    key: 'isFormSubmitted',
    default: false,
});

export const allModelState = atom<Model[]>({
    key: 'all_model',
    default: [],
});
