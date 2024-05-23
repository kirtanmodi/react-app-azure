import React from "react";

import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { deleteAlert } from "../../../__redux/generalSlice";
import { AppDispatch, RootState } from "../../store";
import CustomAlert from "./CustomAlert";

const AllAlerts: React.FC = () => {
  const allAlerts = useSelector((state: RootState) => state.general.allAlerts);
  const dispatch = useDispatch<AppDispatch>();
  const handleAlertDismiss = (id: number) => {
    try {
      dispatch(deleteAlert(id));
    } catch (error) {
      console.error("Error dismissing alert:", error);
    }
  };

  return (
    <Stack
      sx={{
        position: "absolute",
        top: 5,
        transform: "translateX(50%)",
        right: "50%",
        gap: "5px",
        zIndex: 1301,
        maxWidth: "800px",
      }}
      spacing={2}
    >
      {allAlerts.map((alert) => (
        <CustomAlert
          key={alert.id}
          {...alert}
          id={alert.id as number}
          isAbsolute={false}
          setShow={() => handleAlertDismiss(alert.id!)}
          type={alert.type}
        />
      ))}
    </Stack>
  );
};

export default AllAlerts;
