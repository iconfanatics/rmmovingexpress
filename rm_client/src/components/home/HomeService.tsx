"use client";
import { HomeServiceDataProps } from "@/@types/home";
import useHomeService from "@/hooks/queries/useHomeService";
import styles from "../../styles/component/_homeService.module.scss";
import Loader from "../Loader/loading";
import Title from "../Title";
import { HomeServiceIcon } from "./HomeServiceIcon";
import HomeServiceItem from "./HomeServiceItem";

// const homeServiceData: HomeServiceDataProps[] = [
//   {
//     url: "local-moving",
//     iconKey: "moving",
//     title: "Local Moving",
//     details:
//       "Quick and efficient local moving solutions for homes and small offices, stress-free and affordable.",
//   },
//   {
//     url: "office-furniture-moving",
//     iconKey: "island",
//     title: "Office Furniture Moving Services",
//     details:
//       "Reliable, organized office relocations with minimal downtime and safe handling of all furniture and equipment.",
//   },
//   {
//     url: "long-distance-moving",
//     iconKey: "relocation",
//     title: "Long Distance Moving Services",
//     details:
//       " Nationwide moving support with secure packing, timely delivery, and competitive long-distance",
//   },
//   {
//     url: "house-relocation",
//     iconKey: "moving",
//     title: "House Relocation Services",
//     details:
//       "Complete home relocation from packing to setup — fast, careful, and fully insured service.",
//   },
//   {
//     url: "piano-shifting",
//     iconKey: "island",
//     title: "PIANO/SPA Moving",
//     details:
//       "Specialized piano transport using protective gear and expert handling for safe, damage-free delivery. Spa content need to be added",
//   },
//   {
//     url: "nort-south-island-moving",
//     iconKey: "relocation",
//     title: "North & South Island Moving",
//     details:
//       "Seamless inter-island moving with full logistics support from North Island to South Island and back.",
//   },
//   {
//     url: "bike-car-boat-transport",
//     iconKey: "relocation",
//     title: "Bike/Car/Boat Transport",
//     details:
//       "Trusted vehicle and boat transportation with professional handling and nationwide delivery options.",
//   },
//   {
//     url: "kitchen-cabinet-delivery",
//     iconKey: "relocation",
//     title: "Kitchen Cabinet Delivery",
//     details:
//       "Delivering your dream kitchen? Trust Moving Express for reliable and damage-free kitchen cabinet delivery to your doorstep.",
//   },
//   {
//     url: "senior-movers",
//     iconKey: "relocation",
//     title: "Senior movers",
//     details:
//       "Compassionate, professional moving services for seniors — making relocation smooth and worry-free for older adults.",
//   },
// ];

export default function HomeService() {
  const { data, isLoading, isFetching } = useHomeService();

  if (isLoading || isFetching) return <Loader />;
  return (
    <div className={styles.homeService}>
      <div className="container">
        <div className="row">
          <Title
            title="Service"
            subtitle="RM Moving Express offers professional, affordable moving, relocation, and transport services across New Zealand for homes, offices, and vehicles."
          />
        </div>
      </div>
      <div className="container">
        <div className="row">
          {data?.data?.length > 0 ? (
            data?.data?.map((item: HomeServiceDataProps, index: number) => {
              const IconComponent = HomeServiceIcon[item?.icon];
              return (
                <div
                  key={index}
                  className="col-xs-12 col-sm-6 col-md-6 col-xl-4 col-lg-4"
                >
                  <HomeServiceItem
                    icon={<IconComponent Color="#4a4a4a" />}
                    title={item.serviceName?.name}
                    details={item.details}
                    link={item.serviceName?.pretty_name}
                  />
                </div>
              );
            })
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
}
