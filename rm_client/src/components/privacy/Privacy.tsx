import { TermItemProps } from "@/@types/temsType";
import styles from "../../styles/component/_terms_conditions.module.scss";
import Title from "../Title";
import PricacyData from "./PricacyData";

const termsData = [
  {
    id: 1,
    title: "What Information We Collect",
    sub_title: "We may collect the following personal details from you:",
    description: [
      {
        id: 1,
        text: "Your full name, phone number, and email address",
      },
      {
        id: 2,
        text: "Pickup and delivery addresses",
      },
      {
        id: 3,
        text: "Details about your move (type of items, property access, etc.)",
      },
      {
        id: 4,
        text: "Payment details (only when required and securely processed)",
      },
    ],
  },
  {
    id: 1,
    title: "How We Use Your Information",
    sub_title: "Your personal information is used solely for:",
    description: [
      {
        id: 1,
        text: "Providing you with moving quotes and services",
      },
      {
        id: 2,
        text: "Confirming bookings and communicating with you",
      },
      {
        id: 3,
        text: "Processing payments",
      },
      {
        id: 3,
        text: "Improving our service and customer experience",
      },
      {
        id: 3,
        text: "Complying with legal obligations",
      },
    ],
  },
  {
    id: 1,
    title: "How We Store Your Information",
    sub_title:
      "All personal data is stored securely and only accessible to authorized staff. We take reasonable precautions to prevent unauthorized access, loss, or misuse of your information.",
    description: [],
  },
  {
    id: 1,
    title: "Sharing Your Information",
    sub_title:
      "We do not sell, trade, or share your personal information with third parties, except:",
    description: [
      {
        id: 1,
        text: "When legally required to do so (e.g., by government or law enforcement)",
      },
      {
        id: 2,
        text: "To trusted service providers who assist us in operating our business (e.g., payment gateways)",
      },
    ],
  },
  {
    id: 1,
    title: "Cookies & Website Tracking",
    sub_title:
      "Our website may use cookies or tracking tools to monitor site performance and user behavior. These are used to enhance your browsing experience and improve our services. You can disable cookies via your browser settings.",
    description: [],
  },
  {
    id: 1,
    title: "Third-Party Links",
    sub_title:
      "Our website may contain links to external sites. Please note that we are not responsible for the privacy practices of these third-party sites.",
    description: [],
  },
  {
    id: 1,
    title: "Access & Update Your Information",
    sub_title:
      "You may request to access or update the personal information we hold about you at any time by contacting us at [Insert Contact Email].",
    description: [],
  },
  {
    id: 1,
    title: "Changes to This Policy",
    sub_title:
      "We may update this Privacy Policy occasionally. Any changes will be posted on this page with a revised effective date.",
    description: [],
  },
  {
    id: 1,
    title: "Your Consent",
    sub_title:
      "By using our services or submitting your information, you consent to this Privacy Policy.",
    description: [],
  },
];

export default function Privacy() {
  return (
    <div className={styles.conditionWrap}>
      <div className="container">
        <div className="row">
          <Title
            title="Privacy Policy"
            subtitle="At RM Moving Express, we are committed to protecting your privacy. This policy outlines how we collect, use, store, and protect your personal information in connection with our services."
          />
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6 col-xl-6 col-lg-6">
            {termsData.length > 0
              ? termsData.map((item: TermItemProps) => (
                  <PricacyData
                    key={item.id}
                    item={item}
                    title={""}
                    description={[]}
                  />
                ))
              : "Data Not Found"}
          </div>
        </div>
      </div>
    </div>
  );
}
