export const progressTypes = ["default", "income", "expense"] as const;
export type ProgressType = (typeof progressTypes)[number];