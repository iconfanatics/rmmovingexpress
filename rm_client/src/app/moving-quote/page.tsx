import Header from "@/components/header";
import IntersectionAnimationWrapper from "@/components/IntersectionAnimationWrapper";
import Quote from "@/components/Quote";
import Title from "@/components/Title";

export default function MovingQuote() {
  return (
    <IntersectionAnimationWrapper>
      <Header />
      <div className="container">
        <Title
          title="Instant Moving Quote"
          subtitle="Ready to get moving but need a moving quote first? You can create a removalist quote online now – without waiting for someone to get back to you. Create an instant moving quote in 1 minute!"
        />
        <Quote />
      </div>
    </IntersectionAnimationWrapper>
  );
}
