import { FormConfig, FormField } from "@mercatura/ui";
import { FIELDS } from "./FIELDS";

export const FORM_CONFIG: FormConfig = {
  fields: FIELDS as FormField[],
  submitLabel: 'Save Social Links' as string,
  loadingLabel: 'Saving...' as string,
  customClassName: 'social-config' as string,
} as FormConfig;