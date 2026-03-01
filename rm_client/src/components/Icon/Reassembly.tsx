interface ColorProps {
  Color: string;
}
const Reassembly = ({ Color }: ColorProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 496" fill={Color}>
    <path
      d="M496,248c0,137-111,248-248,248S0,385,0,248S111,0,248,0S496,111,496,248z M219.3,379.3l184-184c6.2-6.2,6.2-16.4,0-22.6
	l-22.6-22.6c-6.2-6.2-16.4-6.2-22.6,0L208,300.1l-70.1-70.1c-6.2-6.2-16.4-6.2-22.6,0l-22.6,22.6c-6.2,6.2-6.2,16.4,0,22.6l104,104
	C202.9,385.6,213.1,385.6,219.3,379.3L219.3,379.3z"
    />
  </svg>
);
export default Reassembly;
