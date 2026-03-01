import ServiceImageContent from "./ServiceImageContent";

const data = [
  {
    id: 1,
    title: "Best Cheapest Office Furniture moving in Christchurch",
    sub_title: "Office Furniture Movers",
    description:
      "RM moving express understands the complexities of shifting as it can become a hectic one if not done properly. You can trust us in handling your beautiful office furniture, tech equipment and official documents, cabinets and other office items. ",
    costs_title: "Worried About Moving Costs?",
    costs_subtitle:
      "We’ve got your back! RM Moving Express is a WINZ Quote Registered Supplier, which means you might qualify for financial help with your move. Just reach out—we’ll guide you through the easy process.",
    image: "/service/service10.png",
    position: true,
  },
  {
    id: 2,
    title: "Smooth & Efficient Office Moves with Zero Downtime",
    sub_title: "Office Furniture Movers",
    description:
      " Office shifting is a big task and complex too, only professionals can handle this with ease. RM Moving Express have a team of professional movers who are specialists in moving office furniture and have done this 100’s times before.   ",
    costs_title: "After-hours and weekend moving",
    costs_subtitle:
      "We offer after-hours and weekend moving options, tailored packing, and coordinated delivery. Trust RM Moving Express to handle your office move efficiently and professionally—so you can get back to business fast.",
    image: "/service/service11.png",
    position: false,
  },
  {
    id: 3,
    title:
      "Compare other quotes to us before hiring as you will find us the cheapest movers at Christchurch yet the best of the best listed in Wise Move as well. ",
    sub_title:
      "Cheapest Office Relocations in Christchurch with Trusted Commercial Movers",
    description:
      "Our local movers handle everything — from careful packing to safe transportation — ensuring your belongings arrive intact and on time. We take pride in providing professional, friendly, and prompt local moving solutions.",
    costs_title: "Stress-free office moving",
    costs_subtitle:
      "Our team works outside business hours to minimize downtime, and we provide full disassembly and reassembly services. Book us for a professional, stress-free office move that keeps your team focused on what matters.",
    image: "/service/service12.png",
    position: true,
  },
];

export default function OfficeFurnitureMovingContent() {
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
