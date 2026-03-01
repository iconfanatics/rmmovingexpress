import Header from "@/components/header";
import IntersectionAnimationWrapper from "@/components/IntersectionAnimationWrapper";
import Privacy from "@/components/privacy/Privacy";

export default function PrivacyPolicy() {
  return (
    <IntersectionAnimationWrapper>
      <Header />
      <Privacy />
    </IntersectionAnimationWrapper>
  );
}
