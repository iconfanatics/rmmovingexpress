export interface PageSectionProps {
  page_title: string;
  page_sub_title: string;
}
export interface BannerProps {
  id: number;
  title: string;
  sub_title: string;
}
export interface ServiceProps {
  sort_title: string;
  title: string;
  details: string;
  costs_title: string;
  costs_details: string;
  photo: string;
  position: boolean;
  status: number;
}
export interface ServiceSectionTwoProps {
  title: string;
  sub_title: string;
  details: string;
  need_title: string;
  need_details: string;
}

export interface WhyChooseServiceProps {
  title: string;
  sub_title: string;
  details: string;
}
export interface ChooseProps {
  chooseData: any;
  choose_title: string;
  choose_subtitle: string;
}
export interface ChooseDataProps {
  id: number;
  title: string;
  details: string;
}
export interface HelpFastProps {
  title: string;
  description: string;
}
export interface ServiceFaqsItemsProps {
  id?: number;
  title: string;
  sub_title: string;
}
export interface ServiceFaqsProps {
  faqsData: ServiceFaqsItemsProps[];
  // Any additional optional properties
  anotherProp?: string;
}
