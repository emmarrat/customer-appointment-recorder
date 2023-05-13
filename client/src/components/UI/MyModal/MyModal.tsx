import React from 'react';
import {Dialog, DialogContent, DialogTitle, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  open: boolean;
  handleClose: () => void;
  title?: string;
  children: React.ReactNode;
  isFullWidth?: boolean;
}

const MyModal: React.FC<Props> = ({
                                    open,
                                    handleClose,
                                    title,
                                    children,
                                    isFullWidth
                                  }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={isFullWidth}
    >
      <DialogTitle>
        {title}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{position: 'absolute', top: 10, right: 10}}
        >
          <CloseIcon/>
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{height: isFullWidth ? '100vh' : 'auto'}}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default MyModal;