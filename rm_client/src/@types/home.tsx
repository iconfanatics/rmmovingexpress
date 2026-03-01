import { HomeServiceIcon } from "@/components/home/HomeServiceIcon";
import { ReactNode } from "react";
type IconKey = keyof typeof HomeServiceIcon;
export interface HomeServiceDataProps {
  serviceName: any;
  link: string;
  icon: IconKey;
  title: string;
  details: string;
}

export interface HomeServiceProps {
  link: string;
  title: string;
  details: string;
  icon?: ReactNode;
}
export interface HomeStepProps {
  step: string;
  title: string;
  details: string;
}
export interface TestimonialPropsItem {
  f_name: string;
  l_name: string;
  details: string;
  photo: string;
  created_at: string;
  star: number;
}
