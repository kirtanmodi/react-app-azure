import { Alert, AlertColor, AlertTitle, Slide, Snackbar } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect } from "react";

const timeoutTime = 4000;

const TransitionDown = (props: { children: React.ReactElement }) => {
  return <Slide {...props} direction="down" />;
};

const Message = styled("div")(() => ({
  fontSize: "1.1rem",
}));

interface CustomAlertProps {
  show: boolean;
  setShow: (id: number) => void;
  type: string;
  heading: string;
  message: string;
  myMessage?: string;
  errMessage?: string;
  errDescription?: string;
  id: number;
  styles?: React.CSSProperties;
  isAbsolute?: boolean;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  show,
  setShow,
  type = "success",
  heading,
  message,
  myMessage = null,
  errMessage = null,
  errDescription = null,
  id,
  styles,
  isAbsolute = true,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(id);
    }, timeoutTime);
    return () => clearTimeout(timer);
  }, [id, setShow]);

  return (
    <Snackbar
      open={show}
      ClickAwayListenerProps={{ mouseEvent: false }}
      TransitionComponent={TransitionDown}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{
        position: isAbsolute ? "absolute" : "relative",
        ...styles,
      }}
    >
      <Alert severity={type as AlertColor} onClose={() => setShow(id)} variant="filled">
        <AlertTitle sx={{ fontSize: "1.3rem" }}>{heading}</AlertTitle>
        <Message>{myMessage || message}</Message>
        {errMessage && <Message>{errMessage}</Message>}
        {errDescription && <Message>{errDescription}</Message>}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
