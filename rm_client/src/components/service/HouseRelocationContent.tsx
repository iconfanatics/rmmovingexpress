import ServiceImageContent from "./ServiceImageContent";

const data = [
  {
    id: 1,
    title: "Your Home in Safe Hands",
    sub_title: "House Relocation Services",
    description:
      " From packing and loading to transport and setup, we take care of every part of your move.",
    costs_title: "Worried About Moving Costs?",
    costs_subtitle:
      "We’ve got your back! RM Moving Express is a WINZ Quote Registered Supplier, which means you might qualify for financial help with your move. Just reach out—we’ll guide you through the easy process.",
    image: "/service/service32.png",
    position: true,
  },
  {
    id: 2,
    title: "Reliable House Moves Across New Zealand",
    sub_title: "House Relocation Services",
    description:
      " Russel and his team are the best in house relocation” Thats, the quote we receive after every house relocation services given to the households of Christchurch. Changing of house is a big decision in life and not something that can be done frequently and at this stage you need a right partner who can give you peace of mind in the whole relocation process.",
    costs_title: "Flexible moving options ",
    costs_subtitle:
      "We offer full-service or flexible moving options tailored to your schedule and budget. Whether you’re moving down the street or across the country, we make house shifting simple.",
    image: "/service/service31.png",
    position: false,
  },
  {
    id: 3,
    title: "House Movers That Make Moving Feel Easy",
    sub_title: "House Relocation Services",
    description:
      " Are you searching for the cheapest house relocation services in Christchurch, You’ve come to the right place. RM Moving services is the best yet the cheapest house movers in this locality.",
    costs_title: "Moving with high care",
    costs_subtitle:
      "We treat your belongings with care and respect while keeping to your timeline and budget. Whether you’re upsizing, downsizing, or just shifting neighborhoods, we make it all feel effortless",
    image: "/service/service33.png",
    position: true,
  },
];

export default function HouseRelocationContent() {
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
