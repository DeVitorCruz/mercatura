import { FormConfig, FormField } from "@mercatura/ui";
import { FORM2_FIELDS } from "./FORM2_FIELDS";

export const STEP2_FORM: FormConfig = {
    fields: FORM2_FIELDS as FormField[],
    submitLabel: 'Create Store →' as string,
    loadingLabel: 'Setting up your store...' as string,
    columns: 2,
    customClassName: 'register-tenant-step-2' as string,
} as FormConfig;