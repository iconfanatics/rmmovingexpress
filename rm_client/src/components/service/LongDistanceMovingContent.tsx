import ServiceImageContent from "./ServiceImageContent";

const data = [
  {
    id: 1,
    title: "Distance Doesn’t Matter, We’ve Got You",
    sub_title: "Long Distance Movers",
    description:
      " Whether it’s a solo relocation or an entire household, we make long-distance moves simple and secure.",
    costs_title: "Worried About Moving Costs?",
    costs_subtitle:
      "We’ve got your back! RM Moving Express is a WINZ Quote Registered Supplier, which means you might qualify for financial help with your move. Just reach out—we’ll guide you through the easy process while offering movers services across NZ at low -cost.",
    image: "/service/service15.png",
    position: true,
  },
  {
    id: 2,
    title: "Long Distance Cheapest Home Movers in Christchurch",
    sub_title: "Long Distance Movers",
    description:
      " When choosing your long distance moving partner, check their previous customers' feedback first. Compare the quotes and also count on real experience, when done all this you will find RM Moving Express is the only movers in Christchurch who fulfill all these things. ",
    costs_title: "Stress free long distance moving",
    costs_subtitle:
      "From start to finish, we manage every part of the move so you can relax. Our competitive pricing, timely updates, and reliable service make long distance moving easy and stress-free.",
    image: "/service/service15.1.png",
    position: false,
  },
  {
    id: 3,
    title: "Reliable Long Distance Movers at Affordable Prices",
    sub_title: "Long Distance Movers",
    description:
      " Reliability is a big concern when moving for long distance relocation. At RM moving express we handle everything from packing to the destination placement with complete surety ensuring smooth transition. ",
    costs_title: "No hidden costs",
    costs_subtitle:
      "Our pricing is transparent and competitive, with no hidden costs. Whether you’re moving from Auckland to Christchurch or anywhere in between, we’ve got the skills and trucks to get it done right.",
    image: "/service/service13.png",
    position: true,
  },
];

export default function LongDistanceMovingContent() {
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
