import Address from "@/components/contact/Address";
import ContactForm from "@/components/contact/ContactForm";
import GoogleMap from "@/components/GoogleMap";
import Header from "@/components/header";
import IntersectionAnimationWrapper from "@/components/IntersectionAnimationWrapper";
import Title from "@/components/Title";
import styles from "../../styles/component/_contact_us.module.scss";

export default function mepService() {
  return (
    <IntersectionAnimationWrapper>
      <Header />
      <div className={styles.contactWrap}>
        <div className="container">
          <div className="row">
            <Title
              title="Get in Touch."
              subtitle="We’d love to hear from you—reach out with questions, feedback, or collaboration opportunities anytime."
            />
          </div>
          <div className={styles.contact}>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-8 col-xl-8 col-lg-8">
                <ContactForm />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-4 col-xl-4 col-lg-4">
                <Address
                  name="Our Location"
                  subtitleOne="36 mathesons road philipstown, Christchurch 8011"
                  subtitleTwo=""
                />
                <Address
                  name="Email Us"
                  subtitleOne="info@rmmovingexpress.com"
                  subtitleTwo=""
                />
                <Address
                  name="Contact Us"
                  subtitleOne="+64284215199"
                  subtitleTwo=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <GoogleMap />
    </IntersectionAnimationWrapper>
  );
}
