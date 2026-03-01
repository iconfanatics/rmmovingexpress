import ServiceImageContent from "./ServiceImageContent";

const data = [
  {
    id: 1,
    title: "Just One Item? We’ve Got You",
    sub_title: "Single Item Movers",
    description:
      "Whether it’s a couch, fridge, or antique cabinet, we’ll move it with expert care and attention. We are the top rated single item movers in Wise Move. ",
    costs_title: "Worried About Moving Costs?",
    costs_subtitle:
      "We’ve got your back! RM Moving Express is a WINZ Quote Registered Supplier, which means you might qualify for financial help with your move. Just reach out—we’ll guide you through the easy process",
    image: "/service/service7.png",
    position: true,
  },
  {
    id: 2,
    title: "Quick & Safe Single Item Moves",
    sub_title: "Single Item Movers",
    description:
      " The cheapest movers of single items like bed, fridge, sofa, furniture, mattress, chairs etc. Even if there is a small move within the same building or within a near location we provide the best low cost single item moving services in Christchurch. ",
    costs_title: "Best Single Item Movers in Christchurch",
    costs_subtitle:
      "We offer flexible same-day or next-day options and treat every item like it's valuable—because to you, it is. No job is too small for our professional movers. We're here to make moving one thing just as easy as moving everything.",
    image: "/service/service8.png",
    position: false,
  },
  {
    id: 3,
    title: "Safe, Cheap Single Item Movers Near You",
    sub_title: "Best Single Item Movers",
    description:
      " RM Moving Express is offering quick and professional single item moving and shifting services in Christchurch with budget friendly options. Single items like bed, electronics or any home appliances like fridge, TV, music station, piano we cover it all. ",
    costs_title: "Handle your item with care",
    costs_subtitle:
      "We use the right gear and handle your item with care—every time. It’s fast, simple, and cheaper than hiring a big truck for a small job.",
    image: "/service/service9.1.png",
    position: true,
  },
];

export default function SingleItemMoversContent() {
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
