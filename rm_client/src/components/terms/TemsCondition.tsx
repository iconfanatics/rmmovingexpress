import { TermItemProps } from "@/@types/temsType";
import styles from "../../styles/component/_terms_conditions.module.scss";
import Title from "../Title";
import TemsData from "./TemsData";

const termsData = [
  {
    id: 1,
    title: "Quotes & Estimates",
    description: [
      {
        id: 1,
        text: "All quotes provided are based on the information given by the client.",
      },
      {
        id: 2,
        text: "Final charges may vary depending on actual time, distance, access, and item quantity on the moving day.",
      },
      {
        id: 3,
        text: "Quotes are valid for 14 days unless otherwise stated.",
      },
    ],
  },
  {
    id: 2,
    title: "Booking & Cancellation",
    description: [
      {
        id: 1,
        text: "A booking is confirmed once we receive written or verbal confirmation from the client.",
      },
      {
        id: 2,
        text: "Cancellations must be made at least 24 hours before the scheduled time. Late cancellations may incur a fee.",
      },
      {
        id: 3,
        text: "In the case of a no-show or last-minute cancellation, the client may be charged a call-out fee.",
      },
    ],
  },
  {
    id: 3,
    title: "Payment Terms",
    description: [
      {
        id: 1,
        text: "Payment is required on completion of the job unless agreed otherwise in writing.",
      },
      { id: 2, text: "We accept cash, EFTPOS, and bank transfers." },
      {
        id: 3,
        text: "For long-distance or large jobs, a deposit may be required.",
      },
    ],
  },
  {
    id: 3,
    title: "Customer Responsibilities",
    description: [
      {
        id: 1,
        text: "It is the client's responsibility to ensure parking is available and legal at both pickup and drop-off locations.",
      },
      {
        id: 2,
        text: "All items must be packed and ready to move unless packing services are included in the booking.",
      },
      {
        id: 3,
        text: "The client must disclose fragile or valuable items prior to the move.",
      },
    ],
  },
  {
    id: 3,
    title: "Insurance & Liability",
    description: [
      {
        id: 1,
        text: "RM Moving Express takes utmost care in handling your belongings.",
      },
      {
        id: 2,
        text: "We are not liable for damage to items not packed by our team, or for pre-existing damage.",
      },
      {
        id: 3,
        text: "For high-value items, clients are advised to arrange appropriate insurance coverage.",
      },
    ],
  },
  {
    id: 3,
    title: "Delays & Unforeseen Events",
    description: [
      {
        id: 1,
        text: "While we aim to arrive on time, delays may occur due to traffic, weather, or unforeseen circumstances.",
      },
      {
        id: 2,
        text: "We will communicate any delays and work with you to reschedule if needed.",
      },
    ],
  },
  {
    id: 3,
    title: "Dangerous or Prohibited Items",
    description: [
      {
        id: 1,
        text: "We do not transport hazardous materials, explosives, flammable goods, or illegal substances.",
      },
      {
        id: 2,
        text: "The client must inform us in advance if items require special handling or carry any risks.",
      },
    ],
  },
  {
    id: 3,
    title: "Damage Claims",
    description: [
      {
        id: 1,
        text: "Any claims must be reported within 24 hours of the move.",
      },
      {
        id: 2,
        text: "Claims must be accompanied by photographs and a description of the issue.",
      },
      {
        id: 3,
        text: "We reserve the right to inspect and assess all claims before resolving.",
      },
    ],
  },
  {
    id: 3,
    title: "Right to Refuse Service",
    description: [
      {
        id: 1,
        text: "We reserve the right to refuse service in cases of unsafe working conditions, abusive behavior, or misleading information.",
      },
      { id: 2, text: "Our staff must be treated with respect at all times." },
    ],
  },
];

export default function TemsCondition() {
  return (
    <div className={styles.conditionWrap}>
      <div className="container">
        <div className="row">
          <Title
            title="Terms & Conditions"
            subtitle="Welcome to RM Moving Express. By using our services, you agree to the following terms and conditions. Please read them carefully before booking."
          />
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6 col-xl-6 col-lg-6">
            {termsData.length > 0
              ? termsData.map((item: TermItemProps) => (
                  <TemsData
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
