import team from '../../../assets/images/team.jpg';

export const styles = {
  containerColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  containerRegular: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  activeUsersBlock: {
    bgcolor: 'primary.main',
    borderRadius: '20px',
    padding: '20px 15px',
    maxHeight: '100%',
    overflow: 'scroll',
    boxShadow: '12px 12px 24px #b2b8c9, -12px -12px 24px #f0f8ff',
  },
  messagesBlock: {
    width: '100%',
    borderRadius: '20px',
    padding: '10px 25px',
    maxHeight: '100%',
    overflow: 'scroll',
    boxShadow: '12px 12px 24px #b2b8c9, -12px -12px 24px #f0f8ff',
  },
  messagesBlockInner: {
    flexWrap: 'noWrap',
    width: '100%',
    maxHeight: '100%',
  },
  messageItemBlock: {
    width: '100%',
    overflow: 'scroll',
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    mb: 2,
  },
  button: {
    bgColor: 'primary.main',
    color: '#fff',
  },
  title: {
    my: 3,
    color: 'primary.main',
    fontWeight: 700,
  },
  background: {
    padding: '50px',
    background: `linear-gradient(22deg, rgba(133,83,116,1) 0%, rgba(215,123,179,1) 33%, rgba(255,255,255,0) 100%), url(${team})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right center',
    backgroundSize: 'contain',
    boxShadow: '12px 12px 24px #b2b8c9, -12px -12px 24px #f0f8ff',
  },
  previewTitle: {
    maxWidth: '600px',
    fontWeight: 900,
    mb: 5,
  },
  buttonLink: {
    fontSize: { xs: '10px', md: '14px' },
    color: '#fff',
    padding: '30px',
    borderRadius: '50px',
    bgcolor: 'primary.light',
    boxShadow: '12px 12px 24px #8b5879, -12px -12px 24px #bd78a3',
  },
};
