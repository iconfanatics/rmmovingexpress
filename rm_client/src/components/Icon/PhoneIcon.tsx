interface ColorProps {
  Color: string;
}
const PhoneIcon = ({ Color }: ColorProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.2 33.2" fill={Color}>
    <path
      d="M9.5,16.7c1.5,3.1,4,5.6,7.1,7c0.5,0.2,1,0.2,1.4-0.1l4.5-3c0.4-0.3,0.9-0.3,1.4-0.1l8.5,3.6c0.6,0.2,1,0.9,0.9,1.5
	c-0.6,4.3-4.2,7.6-8.6,7.6C11,33.2,0,22.2,0,8.6C0,4.3,3.2,0.6,7.6,0c0.6-0.1,1.3,0.3,1.5,0.9l3.6,8.5c0.2,0.4,0.2,1-0.1,1.4l-3,4.6
	C9.3,15.7,9.3,16.3,9.5,16.7z"
    />
  </svg>
);
export default PhoneIcon;
