interface ColorProps {
  Color: string;
}
const TopArrow = ({ Color }: ColorProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 47.9" fill={Color}>
    <path
      d="M70.6,38.1l-30-36c-2.3-2.5-6.2-2.7-8.8-0.5c-0.2,0.1-0.3,0.3-0.5,0.5l-30,36c-2.1,2.5-1.8,6.3,0.8,8.4s6.3,1.8,8.4-0.8
	L36,15.3l25.4,30.5c2.1,2.5,5.9,2.9,8.4,0.8C72.4,44.4,72.7,40.6,70.6,38.1z"
    />
  </svg>
);
export default TopArrow;
