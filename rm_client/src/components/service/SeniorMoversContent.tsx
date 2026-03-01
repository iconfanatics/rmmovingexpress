import ServiceImageContent from "./ServiceImageContent";

const data = [
  {
    id: 1,
    title: "Gentle Moves with Extra Care",
    sub_title: "Senior Movers",
    description:
      " Our team offers patient, respectful moving support tailored to seniors relocating to new homes, care facilities, or family residences.",
    costs_title: "Worried About Moving Costs?",
    costs_subtitle:
      " We’ve got your back! RM Moving Express is a WINZ Quote Registered Supplier, which means you might qualify for financial help with your move. Just reach out—we’ll guide you through the easy process.",
    image: "/service/service28.png",
    position: true,
  },
  {
    id: 2,
    title: "Compassionate & Professional Moving Help for Seniors",
    sub_title: "Senior Movers",
    description:
      " Moving can be overwhelming, especially for seniors. That’s why RM Moving Express offers a calm, respectful, and organized moving experience tailored for older adults. Our team is patient, careful, and ready to help every step of the way.",
    costs_title: "Smooth Transition",
    costs_subtitle:
      " Whether downsizing or relocating to assisted living, we make the transition smooth and supportive for seniors and their families.",
    image: "/service/service29.png",
    position: false,
  },
  {
    id: 3,
    title: "Caring & Supportive Moving Help for Seniors",
    sub_title: "Senior Movers",
    description:
      " Our senior moving service is designed with comfort and care in mind. RM Moving Express helps older adults move with ease—whether it’s into a retirement village, smaller home, or with family. ",
    costs_title: "Simple move for Seniors",
    costs_subtitle:
      "We assist with packing, transport, and setup while showing patience and respect throughout the process. It’s more than moving—it’s making transitions simpler for the people who need it most.",
    image: "/service/service30.png",
    position: true,
  },
];

export default function SeniorMoversContent() {
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
