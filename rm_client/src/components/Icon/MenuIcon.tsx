interface ColorProps {
  Color: string;
}
const MenuIcon = ({ Color }: ColorProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill={Color}>
    <g>
      <path d="M16,14H2c-1.1,0-2,0.9-2,2s0.9,2,2,2h14c1.1,0,2-0.9,2-2S17.1,14,16,14z" />
      <path d="M16,7H2C0.9,7,0,7.9,0,9s0.9,2,2,2h14c1.1,0,2-0.9,2-2S17.1,7,16,7z" />
      <path d="M16,0H2C0.9,0,0,0.9,0,2s0.9,2,2,2h14c1.1,0,2-0.9,2-2S17.1,0,16,0z" />
    </g>
  </svg>
);
export default MenuIcon;
