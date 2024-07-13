import { z } from 'zod';

export type ExtendedMessage = {
    text: string | JSX.Element;
    isUserMessage: boolean;
};

/**
 * Model from the backend
 */

export const ModelSchema = z.object({
    app_cost: z.string(),
    app_id: z.string(),
    app_name: z.string(),
    app_subtype: z.string(),
    app_type: z.string(),
    database_cost: z.string(),
    database_date_created: z.string(),
    database_discoverable: z.boolean(),
    database_global: z.boolean(),
    database_id: z.string(),
    database_name: z.string(),
    database_subtype: z.string(),
    database_type: z.string(),
    low_database_name: z.string(),
});

export const ModelListSchema = z.array(ModelSchema);

// extract the inferred type
export type Model = z.infer<typeof ModelSchema>;

export const formSchema = z.object({
    // serverURL: z.string().min(2).max(100),
    // secretKey: z.string().min(2).max(50),
    // accessKey: z.string().min(2).max(50),
    modelID: z.string().min(2).max(50),
});

// Message Pattern
export type ResponsePattern = {
    messageId: string;
    roomId: string;
    response: string;
    numberOfTokensInPrompt: number;
    numberOfTokensInResponse: number;
};

export type MessagePattern = {
    id: string;
    isUserMessage: boolean;
    createdAt: string;
    text: string | JSX.Element;
};
