interface ColorProps {
  Color: string;
}
const LocalMovingIcon = ({ Color }: ColorProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 26" fill={Color}>
    <path
      d="M15.6,0.2c-0.4-0.3-0.9-0.3-1.2,0L0,11.4L1.2,13L3,11.6V24c0,1.1,0.9,2,2,2h20c1.1,0,2-0.9,2-2V11.6l1.8,1.4l1.2-1.6
	L15.6,0.2z M17,24h-4v-8h4V24z M19,24v-8c0-1.1-0.9-2-2-2h-4c-1.1,0-2,0.9-2,2v8H5V10.1l10-7.8l10,7.8V24H19z"
    />
  </svg>
);
export default LocalMovingIcon;
