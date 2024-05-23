import React from "react";
import { Snackbar, Slide } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setOpenError } from "../../../__redux/generalSlice";
import { SlideProps } from "@mui/material/Slide";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { JSX } from "react/jsx-runtime";

interface GeneralState {
  errorMessage: string;
  openError: boolean;
}

const SlideTransition = (props: JSX.IntrinsicAttributes & SlideProps) => {
  return <Slide {...props} direction="left" />;
};

const ErrorComponent: React.FC = () => {
  const { errorMessage, openError } = useSelector<RootState, GeneralState>((state) => state.general);

  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setOpenError(false));
  };

  // const handleReload = () => {
  //   window.location.reload();
  // };

  const styles = {
    errorContainer: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#FBE9E7",
      color: "black",
      padding: "16px",
      width: "300px",
      boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
    },
    errorContentH1: {
      fontSize: "24px",
      margin: "0",
      color: "#D84315",
    },
    errorContentP: {
      margin: "0",
      fontWeight: "bold",
      fontSize: "1.2rem",
    },
    errorActions: {
      display: "flex",
      gap: "10px",
    },
  };

  return (
    <Snackbar
      open={openError}
      onClose={onClose}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={6000}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FBE9E7",
          color: "black",
          padding: "16px",
          width: "300px",
          boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
          borderRadius: "5px",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#222222",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            // marginBottom: "20px",
          }}
        >
          <ErrorOutlineIcon color="error" sx={{ fontSize: 20 }} />
          <p className="fs1" style={styles.errorContentP}>
            {errorMessage}
          </p>
        </div>
        <div style={styles.errorActions}>
          {/* <Button color="primary" variant="contained" onClick={handleReload}>
            Reload page
          </Button>
          <Button color="secondary" onClick={onClose}>
            Dismiss
          </Button> */}
        </div>
      </div>
    </Snackbar>
  );
};

export default ErrorComponent;
