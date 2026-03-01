"use client";
import Header from "@/components/header";
import IntersectionAnimationWrapper from "@/components/IntersectionAnimationWrapper";
import Title from "@/components/Title";
import styles from "../../styles/component/_about.module.scss";
import CompanyInformation from "./_components/CompanyInformation";
import TeamComponent from "./_components/TeamComponent";

export default function mepService() {
  return (
    <IntersectionAnimationWrapper>
      <Header />
      <div className={styles.about}>
        <div className="container">
          <CompanyInformation />

          <div className="row">
            <Title
              title="Meet the Team"
              subtitle="Sales, Operations, Marketing or Business Development – we are here to make your moving experience as smooth as possible."
            />
          </div>
          <TeamComponent />
        </div>
      </div>
    </IntersectionAnimationWrapper>
  );
}
