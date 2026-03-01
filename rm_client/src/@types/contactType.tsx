export interface ContactProps {
  name: string;
  email: string;
  phone?: string;
  subject?: string | null; // Allow null or undefined for phone
  message?: string | null; // Allow null or undefined for message
}
