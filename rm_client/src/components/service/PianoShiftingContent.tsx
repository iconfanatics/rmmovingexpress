import ServiceImageContent from "./ServiceImageContent";

const data = [
  {
    id: 1,
    title: "Need Expert Help Moving a Piano?",
    sub_title: "Piano Movers Christchurch",
    description:
      " Pianos are delicate, heavy, and require expert handling. Our trained movers use specialized equipment, protective padding, and secure transport methods to move your upright or grand piano safely — whether it's within your home, across town, or to a new city.",
    costs_title: "Worried About Moving Costs?",
    costs_subtitle:
      "We’ve got your back! RM Moving Express is a WINZ Quote Registered Supplier, which means you might qualify for financial help with your move. Just reach out—we’ll guide you through the easy process",
    image: "/service/service19.png",
    position: true,
  },
  {
    id: 2,
    title: "Specialized Piano Movers You Can Trust",
    sub_title: "Piano Movers in Christchurch",
    description:
      " Moving a piano is a delicate job, and we’re the pros who can do it right. Whether it’s an upright or baby grand, RM Moving Express uses proper equipment and trained handlers to ensure your instrument is protected during every step of the move.",
    costs_title: "Long Distance Piano Movers",
    costs_subtitle:
      "We treat your piano like the fine instrument it is—because moving music requires more than muscle. Trust our team for careful, affordable, and professional piano shifting.",
    image: "/service/service21.png",
    position: false,
  },
  {
    id: 3,
    title: "Best Piano Movers and Trained Professionals",
    sub_title: "Piano Moving services in Christchurch",
    description:
      " Moving a piano requires skill, precision, and care. At RM Moving Express, we offer professional piano shifting services for upright and grand pianos alike. ",
    costs_title: "Moving without a scratch",
    costs_subtitle:
      " Our team uses proper lifting equipment, padding, and transport gear to ensure your instrument arrives without a scratch. Whether it’s a family heirloom or a performance piece, we move it safely, affordably, and on your schedule.",
    image: "/service/service20.png",
    position: true,
  },
];

export default function PianoShiftingContent() {
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
