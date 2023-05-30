import salon from './assets/images/salon.jpg';
export const boxShadow = '12px 12px 24px #b2b8c9, -12px -12px 24px #f0f8ff';
export const gradient =
  'linear-gradient(22deg, rgba(133,83,116,1) 0%, rgba(215,123,179,1) 33%, rgba(255,255,255,0) 100%)';
export const borderRadius = '30px';
export const block = {
  block: {
    background: `${gradient}, url(${salon})`,
    backgroundPositionY: '40%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    boxShadow,
  },
  padding: { xs: '30px', md: '50px' },
  height: { xs: '200px', sm: '300px', md: '400px', lg: '450px' },
  title: {
    fontWeight: 700,
    lineHeight: '1.5',
  },
  fontSize: { xs: '15px', sm: '25px', md: '35px', lg: '38px' },
  maxWidth: { xs: '250px', sm: '500px', md: '600px', lg: '700px', xl: '850px' },
  btnFontSize: { xs: '10px', md: '15px' },
};
