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
};
