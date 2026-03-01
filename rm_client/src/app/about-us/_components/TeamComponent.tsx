"use client";
import { TermItemProps } from "@/@types/temsType";
import Team from "@/components/about/Team";
import Loader from "@/components/Loader/loading";
import useFetchTeam from "@/hooks/queries/useFetchTeam";

const TeamComponent = () => {
  const { data, isLoading, isFetching } = useFetchTeam();

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <div>
      {data?.data?.map((item: TermItemProps) => (
        <Team
          key={item.id}
          photo={`${process.env.NEXT_PUBLIC_API_IMAGES_URL}/image/${item.photo}`}
          name={item.name}
          designation={item.designation}
          details={item.details}
          id={item.id}
          status={item.status}
        />
      ))}
    </div>
  );
};

export default TeamComponent;
