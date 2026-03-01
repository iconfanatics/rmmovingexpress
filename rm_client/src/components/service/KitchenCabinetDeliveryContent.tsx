import ServiceImageContent from "./ServiceImageContent";

const data = [
  {
    id: 1,
    title: "Fragile & Bulky? We Deliver with Care",
    sub_title: "Commercial Moving",
    description:
      " We understand the value and sensitivity of cabinetry. Our experts ensure every cabinet is wrapped, loaded, and delivered safely.",
    costs_title: "Worried About Moving Costs?",
    costs_subtitle:
      "We’ve got your back! RM Moving Express is a WINZ Quote Registered Supplier, which means you might qualify for financial help with your move. Just reach out—we’ll guide you through the easy process.",
    image: "/service/service25.png",
    position: true,
  },
  {
    id: 2,
    title: "Affordable Commercial Moving Done Right",
    sub_title: "Commercial Moving",
    description:
      " Need a kitchen cabinet or other large furniture item delivered? RM Moving Express offers secure, same-day or next-day delivery at prices that won’t break the bank. We handle pick-up, loading, and safe transport for a wide range of furniture items.",
    costs_title: "Extra care to protect things",
    costs_subtitle:
      "We take extra care to protect surfaces and corners during loading and unloading. Whether it’s from a warehouse or online marketplace, we’ll get it there safely.",
    image: "/service/service26.png",
    position: false,
  },
  {
    id: 3,
    title: "Furniture & Cabinet Delivery Done Right",
    sub_title: "Commercial Moving",
    description:
      " Need to deliver kitchen cabinets or large furniture pieces? RM Moving Express provides professional, affordable furniture and cabinet delivery services.",
    costs_title: "Delivery without damage",
    costs_subtitle:
      "We pick up from retail stores, warehouses, or private sellers and ensure everything is delivered without damage. Whether you're renovating or relocating, we make sure your new cabinets arrive in perfect condition.",
    image: "/service/service27.png",
    position: true,
  },
];

export default function KitchenCabinetDeliveryContent() {
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
