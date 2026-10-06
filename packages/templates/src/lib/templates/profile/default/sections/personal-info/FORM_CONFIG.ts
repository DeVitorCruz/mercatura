import { FormConfig, FormField } from "@mercatura/ui";
import { FIELDS } from "./FIELDS";

export const FORM_CONFIG: FormConfig = {
  fields: FIELDS as FormField[],
  submitLabel: 'Save Changes' as string,
  loadingLabel: 'Saving...' as string,
  columns: 1 as number,
  customClassName: 'personal-info-config' as string,
} as FormConfig;