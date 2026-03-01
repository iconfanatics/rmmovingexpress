import ServiceImageContent from "./ServiceImageContent";

const data = [
  {
    id: 1,
    title: "Relocate Across Islands, Hassle-Free",
    sub_title: "North & South Island Movers",
    description:
      " We manage the logistics of moving between the North and South Island so you don’t have to worry.",
    costs_title: "Worried About Moving Costs?",
    costs_subtitle:
      "We’ve got your back! RM Moving Express is a WINZ Quote Registered Supplier, which means you might qualify for financial help with your move. Just reach out—we’ll guide you through the easy process.",
    image: "/service/service34.png",
    position: true,
  },
  {
    id: 2,
    title: "Inter-Island Moving Made Simple",
    sub_title: "North & South Island Movers",
    description:
      " Whether you’re moving from the North Island to the South or vice versa, RM Moving Express offers reliable inter-island transport for homes and businesses. We handle logistics, ferry bookings, and delivery so you don’t have to worry about anything.",
    costs_title: "Professional movers across islands",
    costs_subtitle:
      " From packing to final setup, we manage your move end-to-end. Get peace of mind with professional movers who know how to move across islands efficiently.",
    image: "/service/service35.png",
    position: false,
  },
  {
    id: 3,
    title: "Inter-Island Moving Services You Can Rely On",
    sub_title: "North & South Island Movers",
    description:
      " Moving between islands? RM Moving Express offers fully managed North and South Island moving services. We coordinate ferry transport, logistics, and safe delivery across Christchurch and New Zealand. ",
    costs_title: "Affordable, secure and on-time",
    costs_subtitle:
      "Our team handles everything from home contents to office equipment. Affordable, secure, and on time—inter-island moving doesn’t have to be stressful when you’ve got the right partner on your side.",
    image: "/service/service36.png",
    position: true,
  },
];

export default function NortSouthIslandMovingContent() {
  return (
    <>
      {data.map((item, index) => (
        <ServiceImageContent
          key={item.id}
          title={item.title}
          sub_title={item.sub_title}
          description={item.description}
          costs_title={item.costs_title}
          costs_subtitle={item.costs_subtitle}
          image={item.image}
          position={item.position}
        />
      ))}
    </>
  );
}
