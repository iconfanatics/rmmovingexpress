import CubicMetter from "@/components/CubicMetter";
import Header from "@/components/header";
import Title from "@/components/Title";

export default function MovingQuote() {
  return (
    <>
      <Header />
      <div className="container">
        <Title
          title="Cubic Meter Calculator"
          subtitle="Wondering what size of truck you need for your next move? To be sure that your items fit into the moving truck you choose, use our cubic meter calculator to find out the total volume of your items in m3. Select the furniture that you own and let the calculator do the magic!"
        />
        <CubicMetter />
      </div>
    </>
  );
}
