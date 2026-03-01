export default function GoogleMap() {
  return (
    <>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2892.252708927442!2d172.65688357698028!3d-43.53877388239275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d3189ed817bbf97%3A0x1047559348132ca0!2s36%20Mathesons%20Road%2C%20Phillipstown%2C%20Christchurch%208011%2C%20New%20Zealand!5e0!3m2!1sen!2sbd!4v1748761886649!5m2!1sen!2sbd"
        width="100%"
        height="400"
        // style="border:0;"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </>
  );
}
