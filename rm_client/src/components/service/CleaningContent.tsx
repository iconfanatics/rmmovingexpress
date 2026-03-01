import ServiceImageContent from "./ServiceImageContent";

const data = [
  {
    id: 1,
    title: "Let Us Handle the Mess",
    sub_title: "Cleaning and Decluttering",
    description:
      "Clear the mess with RM Moving Express with professional cleaning and decluttering services. We are here to keep you more organized so you can focus on your important stuff.",
    costs_title: "Worried About Moving Costs?",
    costs_subtitle:
      "We’ve got your back! RM Moving Express is a WINZ Quote Registered Supplier, which means you might qualify for financial help with your move. Just reach out—we’ll guide you through the easy process.",
    image: "/service/service4.png",
    position: true,
  },
  {
    id: 2,
    title: "Fast & Affordable Cleaning Help",
    sub_title: "Cleaning and Decluttering",
    description:
      "We sort things from what goes to donation and what goes to the dust bin. Some parts of the house like garages and attic need more cleaning than any other place, we specialized in both cleaning and decluttering services of all small places which is not easy to clear.",
    costs_title:
      "Need Fast & Affordable Cleaning Help Before or After Your Move",
    costs_subtitle:
      "Our team works fast and respects your schedule. We remove unwanted items, organize what's staying, and thoroughly clean the space for handover or personal comfort. Trust RM Moving Express to make your move easier with reliable, professional cleaning services at competitive prices.",
    image: "/service/service5.png",
    position: false,
  },
  {
    id: 3,
    title: "Get More Space with Professional Decluttering Services",
    sub_title: "Cleaning and Decluttering",
    description:
      "It's time to transform dirty places into well organized and clean areas, this could only happened when done properly by expert cleaners. ",
    costs_title: "Your go-to movers in Christchurch",
    costs_subtitle:
      "Whether you’re moving out, preparing for sale, or just need a reset, our experienced cleaners and movers handle it all. Affordable, quick, and thorough—we’re your go-to moving support team in Christchurch.",
    image: "/service/service6.png",
    position: true,
  },
];

export default function CleaningContent() {
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
