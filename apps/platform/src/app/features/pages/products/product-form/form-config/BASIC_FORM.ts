import { FormConfig, FormField } from "@mercatura/ui";
import { FIELDS } from "./FIELDS";

export const BASIC_FORM: FormConfig = {
    fields: FIELDS,
    submitLabel: 'Save Product',
    loadingLabel: 'Saving...',
    columns: 1,
    customClassName: 'basic-form',
} as FormConfig;