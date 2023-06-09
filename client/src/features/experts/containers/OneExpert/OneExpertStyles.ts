export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flexDirection: { xs: 'column', md: 'row' },
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniWrapp: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 1,
  },
  serviceBtn: {
    bgcolor: 'primary.light',
    color: '#fff',
  },
  serviceIcon: {
    ml: 1,
    color: 'info.main',
  },
  divider: {
    my: 3,
  },
  calendar: {
    width: { xs: '85%', sm: '100%' },
  },
};
