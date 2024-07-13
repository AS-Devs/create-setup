import React, { useEffect } from 'react';
import { BsReverseLayoutSidebarInsetReverse } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRecoilState } from 'recoil';
import { allModelState, formState, formSubmitState } from '@/stores/atoms/formAtom';
import { Button } from '../ui/button';
import { useInsight } from '@semoss/sdk-react';
import { ModelListSchema, ModelSchema, formSchema } from '@/types/message';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';

function Sidebar() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    // const { register, handleSubmit } = useForm<FormDataType>();
    const { actions } = useInsight();
    const [formData, setFormData] = useRecoilState(formState);
    const [isSubmitted, setIsSubmitted] = useRecoilState(formSubmitState);
    const [models, setModels] = useRecoilState(allModelState);

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.table(values);

        // Now Start working after getting the result. Make sure you disable the input for time being.

        // This step will happen to hold the state. Reset button will again make the input working
        setFormData(values);
        setIsSubmitted(true);
    }

    useEffect(() => {
        const pixel = `MyEngines( engineTypes=["MODEL"]);`;
        actions.run(pixel).then((response) => {
            const { output, operationType } = response.pixelReturn[0];
            if (operationType.indexOf('ERROR') > -1) {
                throw new Error(output as string);
            }
            if (Array.isArray(output)) {
                const allmodel = ModelListSchema.safeParse(output);
                if (!allmodel.success) {
                    // handle error then return
                    console.log(allmodel.error);
                } else {
                    // do something
                    const data = allmodel.data;
                    setModels(data);
                    setFormData({
                        modelID: data[2].app_id,
                    });
                    form.setValue('modelID', data[2].app_id);
                }
            }
        });
    }, []);

    return (
        <div className="py-2">
            <div className="flex justify-between items-center">
                <p className="text-xl text-gray-300 font-bold">ChatBot</p>
                <button onClick={() => {}} className="p-1" aria-label="Sidebar Icon">
                    <BsReverseLayoutSidebarInsetReverse className="h-6 w-6 text-gray-300" />
                </button>
            </div>
            {/* Input List Section using react-form-hook */}
            <div className="mt-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* <FormField
                            control={form.control}
                            name="serverURL"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm mb-1 font-medium text-gray-300">
                                        AI Server URL
                                    </FormLabel>
                                    <FormControl className=" border-0 bg-[#34343e] rounded-md p-2 w-full text-gray-100 disabled:bg-gray-600 disabled:cursor-not-allowed">
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="secretKey"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm mb-1 font-medium text-gray-300">
                                        Secret Key
                                    </FormLabel>
                                    <FormControl className="border-0 bg-[#34343e] rounded-md p-2 w-full text-gray-100 disabled:bg-gray-600 disabled:cursor-not-allowed">
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="accessKey"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm mb-1 font-medium text-gray-300">
                                        Access Key
                                    </FormLabel>
                                    <FormControl className="border-0 bg-[#34343e] rounded-md p-2 w-full text-gray-100 disabled:bg-gray-600 disabled:cursor-not-allowed">
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}

                        <FormField
                            control={form.control}
                            name="modelID"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel className="text-sm mb-1 font-medium text-gray-300">
                                        Model Engine ID
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-full bg-[#34343e] text-gray-100 border-none">
                                                <SelectValue placeholder="Model Engine" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-[#34343e] text-gray-100">
                                            {models.length &&
                                                models.map((model) => (
                                                    <SelectItem
                                                        key={model.app_id}
                                                        value={model.app_id}
                                                    >
                                                        {model.app_name}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {isSubmitted ? (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsSubmitted(false)}
                            >
                                Reset
                            </Button>
                        ) : (
                            <button
                                type="submit"
                                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                            >
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Let's Connect !
                                </span>
                            </button>
                        )}
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default Sidebar;
