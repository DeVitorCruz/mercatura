import { FormConfig, FormField } from "@mercatura/ui";
import { FIELDS } from "./FIELDS";

export const FORM_CONFIG: FormConfig = {
    fields: FIELDS as FormField[],
    submitLabel: 'Save Address' as string,
    loadingLabel: 'Saving...' as string,
    columns: 2 as number,
    customClassName: 'address-config' as string,
} as FormConfig;