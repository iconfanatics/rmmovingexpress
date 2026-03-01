import ServiceImageContent from "./ServiceImageContent";

const data = [
  {
    id: 1,
    title: "Trusted Vehicle Transport Across NZ",
    sub_title: "Bike, Car & Boat Transport",
    description:
      " We use secure carriers and experienced staff to safely transport your vehicle door-to-door or depot-to-depot.",
    costs_title: "Worried About Moving Costs?",
    costs_subtitle:
      " We’ve got your back! RM Moving Express is a WINZ Quote Registered Supplier, which means you might qualify for financial help with your move. Just reach out—we’ll guide you through the easy process.",
    image: "/service/service22.png",
    position: true,
  },
  {
    id: 2,
    title: "Safe & Reliable Vehicle Transport Across NZ",
    sub_title: "Bike, Car & Boat Transport",
    description:
      " Need to move a bike, car, or even a boat? We’ve got the right equipment and experienced team to get your vehicle delivered safely, on time, and at an affordable price.",
    costs_title: "Loading with professional care",
    costs_subtitle:
      "Our vehicle transport service is fully insured, and we handle loading, securing, and transport with professional care. Whether short haul or cross-country, we’ve got you covered.",
    image: "/service/service23.png",
    position: false,
  },
  {
    id: 3,
    title: "Specialist Vehicle Movers Across New Zealand",
    sub_title: "Bike, Car & Boat Transport",
    description:
      " Whether it’s a bike, car, or boat, RM Moving Express offers safe and affordable vehicle transport services across NZ. Our team secures your vehicle using industry-standard equipment and ensures smooth, damage-free delivery. ",
    costs_title: "City moves to countryside",
    costs_subtitle:
      "From city moves to rural locations, we handle it all with care and precision. Choose us for fast turnaround, competitive pricing, and complete peace of mind.",
    image: "/service/service24.png",
    position: true,
  },
];

export default function BikeCarBoatTtransportContent(
  sort_title,
  title,
  description,
  costs_title,
  costs_details,
  photo,
  position,
  status
) {
  return (
    <>
      <ServiceImageContent
        sort_title={sort_title}
        title={title}
        description={description}
        costs_title={costs_title}
        costs_details={costs_details}
        photo={photo}
        position={position}
        status={status}
      />
    </>
  );
}
