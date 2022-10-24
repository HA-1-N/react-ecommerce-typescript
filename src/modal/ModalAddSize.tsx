import { Alert, Button, Grid, Modal, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  background: "#fff",
};

const ModalAddSize = (props: any) => {
  const { open, onClose, user } = props;

  const [size, setSize] = useState<any>("");

  const handleBtnCancel = () => {
    onClose();
    setSize("");
  };

  const handleChangeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value);
  };

  const handleBtnAdd = () => {
    const addSize = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/sizes",
          {
            size: size,
          },
          {
            headers: {
              token: `Bearer ${user?.accessToken}`,
              // "Content-Type": "text/plain",
            },
          }
        );
        // console.log("res...", res);
        if (res?.status) {
          toast.success("Create success !", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setSize("");
          onClose();
        } else {
          toast.error("Error !", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (error) {
        toast.error("Error !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
    addSize();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          // component="form"
          // sx={{
          //   "& .MuiTextField-root": { m: 1, width: "25ch" },
          // }}
          // noValidate
          // autoComplete="off"
        >
          <h3>Add Product</h3>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 2, sm: 2, md: 3 }}
          >
            <Grid item sm={12}>
              <TextField
                id="size"
                name="size"
                label="Size"
                variant="outlined"
                sx={{ width: "100%" }}
                value={size}
                onChange={handleChangeSize}
              />
            </Grid>
            <Grid item sm={12} justifyContent="center">
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 1, md: 3 }}
                sx={{
                  justifyContent: "center",
                  marginTop: "40px",
                  marginBottom: "20px",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ width: "120px" }}
                  onClick={handleBtnCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  sx={{
                    width: "120px",
                  }}
                  onClick={handleBtnAdd}
                >
                  Add
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <ToastContainer autoClose={5000} />
    </>
  );
};

export default ModalAddSize;
