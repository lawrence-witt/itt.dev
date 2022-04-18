/**
 * Model definition for Skill
 */
export interface ISkill {
  id: string;
  title: string;
  type: "language" | "library" | "tool";
  custom_svg: string;
  theme?: string;
  created_at: Date;
  updated_at: Date;
  published_at: Date;
}