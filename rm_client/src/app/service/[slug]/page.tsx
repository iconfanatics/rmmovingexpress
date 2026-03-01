"use client";
import {
  BannerProps,
  ServiceProps,
  ServiceSectionTwoProps,
} from "@/@types/service";
import ServiceFaq from "@/components/faq/ServiceFaq";
import Header from "@/components/header";
import IntersectionAnimationWrapper from "@/components/IntersectionAnimationWrapper";
import Loader from "@/components/Loader/loading";
import HelpFast from "@/components/service/HelpFast";

import PageSection from "@/components/service/PageSection";
import ServiceImageContent from "@/components/service/ServiceImageContent";

import WhyChoose from "@/components/service/WhyChoose";
import Title from "@/components/Title";
import useFetchServicePage from "@/hooks/queries/useFetchServicePage";

const chooseData = [
  {
    id: 1,
    title: "Fully Insured Transport",
    details: "Peace of mind for your valuable car, bike, or boat.",
  },
  {
    id: 2,
    title: "Nationwide Coverage",
    details: "We transport to and from any city in NZ.",
  },
  {
    id: 3,
    title: "Specialty Carriers",
    details: "Equipped trailers designed for different vehicle types.",
  },
  {
    id: 4,
    title: "Pickup & Drop-Off Flexibility",
    details: "Home, depot, or specified location — we’re flexible.",
  },
  {
    id: 4,
    title: "Affordable & Transparent Rates",
    details: "No surprises — you get a full quote upfront.",
  },
];
const faqData = [
  {
    id: 1,
    title: "Can you transport non-running vehicles?",
    sub_title:
      "Yes, as long as we’re informed in advance so we can bring the right equipment.",
  },
  {
    id: 2,
    title: "Is vehicle transport insured?",
    sub_title:
      "Yes, all vehicle moves are covered by our basic insurance policy.",
  },
  {
    id: 3,
    title: "Do you offer door-to-door delivery?",
    sub_title: "Yes, we aim for direct delivery whenever access allows.",
  },
  {
    id: 4,
    title: "How much does it cost to move a car across NZ?",
    sub_title:
      "Prices vary by distance and vehicle size—starting from $250. Request a quote for exact pricing.",
  },
  {
    id: 5,
    title: "Do I need to empty the fuel tank before transport?",
    sub_title:
      "For safety, we recommend keeping fuel to a minimum—about a quarter tank is ideal.",
  },
  {
    id: 6,
    title: "Can I transport personal items inside the vehicle?",
    sub_title:
      "We generally discourage it, but small, secured items may be allowed with prior notice.",
  },
];

export default function ServicePage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const {
    data: fetchServiceData,
    isLoading,
    isFetching,
    isError,
  } = useFetchServicePage(slug);

  console.log(fetchServiceData);

  if (isLoading || isFetching) {
    return (
      <>
        <Loader />
      </>
    );
  }
  if (isError) {
    return (
      <>
        <h3>Error</h3>
      </>
    );
  }

  return (
    <IntersectionAnimationWrapper>
      <Header />
      {fetchServiceData && fetchServiceData?.data ? (
        fetchServiceData?.data?.banner?.map((banner: BannerProps) => (
          <PageSection
            page_title={banner.title}
            page_sub_title={banner.sub_title}
            key={banner.id}
          />
        ))
      ) : (
        <>
          <h3>Not Found</h3>
        </>
      )}

      {fetchServiceData &&
      fetchServiceData?.data &&
      fetchServiceData?.data?.content?.length > 0 ? (
        fetchServiceData?.data?.content?.map(
          (content: ServiceProps, index: number) => (
            <ServiceImageContent
              sort_title={content.sort_title}
              title={content.title}
              details={content.details}
              costs_title={content.costs_title}
              costs_details={content.costs_details}
              photo={content.photo}
              position={content.position}
              status={content.status}
              key={index}
            />
          )
        )
      ) : (
        <>
          <h3>Not Found</h3>
        </>
      )}

      {fetchServiceData &&
      fetchServiceData?.data &&
      fetchServiceData?.data?.sectionTwo?.length > 0 ? (
        fetchServiceData?.data?.sectionTwo?.map(
          (item: ServiceSectionTwoProps, index: number) => (
            <div key={index}>
              <WhyChoose
                title={item.title}
                sub_title={item.sub_title}
                details={item.details}
              />
              <HelpFast
                title={item.need_title}
                description={item.need_details}
              />
            </div>
          )
        )
      ) : (
        <>
          <h3>Not Found</h3>
        </>
      )}

      <Title title="Faqs" subtitle="Vehicle Transport" />

      {fetchServiceData &&
      fetchServiceData?.data &&
      fetchServiceData?.data?.faq?.length > 0 ? (
        <ServiceFaq faqsData={fetchServiceData?.data?.faq} />
      ) : (
        <>
          <h3>Not Found</h3>
        </>
      )}
    </IntersectionAnimationWrapper>
  );
}
