import ServiceImageContent from "./ServiceImageContent";

const data = [
  {
    id: 1,
    title: "Need Help for Moving Across Town at Low cost?",
    sub_title: "Best Local Movers",
    description:
      "Our team of skilled local movers handles everything with care. We take pride in providing the best shifting services in Christchurch and across New Zealand.",
    costs_title: "Worried About Moving Costs?",
    costs_subtitle:
      "We’ve got your back! RM Moving Express is a WINZ Quote Registered Supplier, which means you might qualify for financial help with your move. Just reach out—we’ll guide you through the easy process.",
    image: "/service/service1.png",
    position: true,
  },
  {
    id: 2,
    title: "Cheap Local Movers in Christchurch",
    sub_title: "Local Movers",
    description:
      "Local moving requires local guys who know the area completely from every street to every corner. At RM Moving Express we are the local movers of Christchurch who are providing the most affordable local shifting services. ",
    costs_title: "Flexible scheduling, transparent quotes",
    costs_subtitle:
      "As experienced item movers in Christchurch, we provide flexible scheduling, transparent quotes, and top-notch customer service. Whether you're moving across the street or across town, we make your move hassle-free and cost-effective. Let our friendly, trained moving team take the stress out of your next local move.",
    image: "/service/service2.png",
    position: false,
  },
  {
    id: 3,
    title: "Affordable & Professional Local Moving Services",
    sub_title: "Local Movers",
    description:
      "Finding a trustable item movers is very difficult at this age, we specialize in efficient local moving solutions for homes, companies and small offices. Our team handles all the items with care and ensure the safe delivery to your new location",
    costs_title: "Fast, Easy, and Stress-free",
    costs_subtitle:
      "We understand that no two moves are the same. That’s why we offer tailored moving services to suit your specific needs and schedule. From packing and lifting to transport and unloading, our Christchurch movers are here to make your move fast, easy, and stress-free—without stretching your budget.",
    image: "/service/service3.png",
    position: true,
  },
];

export default function LocalMovingContent() {
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
