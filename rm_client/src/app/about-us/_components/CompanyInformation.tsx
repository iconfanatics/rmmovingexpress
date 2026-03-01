"use client";
import HtmlContent from "@/components/HtmlContent";
import ImageResponsive from "@/components/image/ImageResponsive";
import Loader from "@/components/Loader/loading";
import useFetchCompanyInformation from "@/hooks/queries/useFetchCompanyInformation";
import styles from "../../../styles/component/_about.module.scss";

const CompanyInformation = () => {
  const { data, isLoading, isFetching } = useFetchCompanyInformation();

  if (isLoading || isFetching) {
    return <Loader />;
  }
  return (
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-6 col-xl-6 col-lg-6">
        <div className={`reveal ${styles.aboutTop}`}>
          <h5 className="fadeup-smaa">{data?.data?.sort_title}</h5>
          <h2 className="fadeup-smaa">{data?.data?.title}</h2>
          <div className="fadeup-smaa">
            <HtmlContent content={data?.data?.details} />
          </div>
        </div>
      </div>
      <div className="col-xs-12 col-sm-12 col-md-6 col-xl-6 col-lg-6 reveal">
        <div className={`image-wrapa ${styles.aboutTop}`}>
          <ImageResponsive
            width={570}
            height={304}
            src={`${process.env.NEXT_PUBLIC_API_IMAGES_URL}/image/${data?.data?.photo}`}
            alt={data?.data?.title}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyInformation;
