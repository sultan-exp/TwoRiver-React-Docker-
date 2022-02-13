import { makeStyles, Typography } from '@material-ui/core';
import LogoImg from './../assets/logo.png';
import FooterLogoImg from './../assets/logo-bg-white.png';

const Logo = ({ ...props }) => (
  <>
    <img
      alt="Logo"
      src={props.from === 'footer' ? FooterLogoImg : LogoImg}
      {...props}
    />
  </>
)

export default Logo;
