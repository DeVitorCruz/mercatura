export interface WizardStep {
    id: number;
    label: string;
    description?: string;
};

export interface WizardConfig {
    steps: WizardStep[];
    currentStep: number;
};


