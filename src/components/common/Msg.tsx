import { Alert, AlertColor, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';

export const Msg = () => {
  const [msgOpen, setMsgOpen] = useState(false);
  const [msgType, setMsgType] = useState<AlertColor>('success');
  const [msgContent, setMsgContent] = useState('');
  const handleMsgClose = () => {
    setMsgOpen(false);
  };
  const mySubscriber = (msg: string, data: any) => {
    setMsgOpen(true);
    setMsgType(data.severity);
    setMsgContent(data.content);
  };
  useEffect(() => {
    PubSub.subscribe('MSG', mySubscriber);
    return () => {
      PubSub.unsubscribe('MSG');
    };
  }, []);
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={msgOpen}
      autoHideDuration={2000}
      onClose={handleMsgClose}
    >
      <Alert onClose={handleMsgClose} severity={msgType} sx={{ width: '100%' }}>
        {msgContent}
      </Alert>
    </Snackbar>
  );
};
