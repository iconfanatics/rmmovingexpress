import Link from "next/link";
import styles from "../../styles/component/steep.module.scss";
import Title from "../Title";
import HomeStepItem from "./HomeStepItem";

export default function HomeStep() {
  return (
    <div className={styles.stepWrap}>
      <div className="container">
        <div className="row">
          <Title
            title="Moving with Swift is Easy."
            subtitle="Proudly based in the vibrant city of Christchurch, we extend our expert
        moving services to cater to the entire nation of New Zealand."
          />
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-4 col-xl-4 col-lg-4">
            <div className={styles.getQuoteBtn}>
              <Link href="/moving-quote" className={styles.getQuote}>
                GET A QUOTE TODAY
              </Link>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-8 col-xl-8 col-lg-8">
            <div className="row">
              <HomeStepItem
                step="STEP 1"
                title="Inquiry"
                details="Quickly fill out the form here on our website and we’ll get you
          started."
              />
              <HomeStepItem
                step="STEP 2"
                title="Customised Quote"
                details="We’ll send you a customised quote and wait for your confirmation."
              />
              <HomeStepItem
                step="STEP 1"
                title="Packing & Preparation"
                details="Let’s take you through our Terms & Conditions and ensure your prepared for moving day."
              />
              <HomeStepItem
                step="STEP 1"
                title="Smooth Moving Day"
                details="Let our expert team handle pick up and delivery in a timely and reliable manner."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
