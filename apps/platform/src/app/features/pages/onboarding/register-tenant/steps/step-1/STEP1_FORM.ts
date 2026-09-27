import { FormConfig, FormField } from "@mercatura/ui";
import { FORM_FIELDS } from "./FORM_FIELDS";

export const STEP1_FORM: FormConfig = {
    fields: FORM_FIELDS as FormField[],
    submitLabel: 'Continue →' as string,
    loadingLabel: 'Creating...' as string,
    columns: 1,
    customClassName: 'register-tenant-step-1' as string,
} as FormConfig;