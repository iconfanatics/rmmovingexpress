import Header from "@/components/header";
import IntersectionAnimationWrapper from "@/components/IntersectionAnimationWrapper";
import TemsCondition from "@/components/terms/TemsCondition";

export default function TermsAndConditions() {
  return (
    <IntersectionAnimationWrapper>
      <Header />
      <TemsCondition />
    </IntersectionAnimationWrapper>
  );
}
