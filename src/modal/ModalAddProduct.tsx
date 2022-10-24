import { PriceCheckTwoTone } from "@mui/icons-material";
import {
  Alert,
  Button,
  Grid,
  MenuItem,
  Modal,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

var token: any;
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

// const totalSize: any = [
//   {
//     value: "M",
//     label: "M",
//   },
//   {
//     value: "S",
//     label: "S",
//   },
//   {
//     value: "L",
//     label: "L",
//   },
//   {
//     value: "XL",
//     label: "XL",
//   },
//   {
//     value: "XXL",
//     label: "XXL",
//   },
//   {
//     value: "XXXL",
//     label: "XXXL",
//   },
//   {
//     value: "XXXXL",
//     label: "XXXXL",
//   },
// ];

const totalColor: any = [
  {
    value: "red",
    label: "red",
  },
  {
    value: "white",
    label: "white",
  },
  {
    value: "Yellow",
    label: "Yellow",
  },
  {
    value: "Blue",
    label: "Blue",
  },
  {
    value: "Green",
    label: "Green",
  },
  {
    value: "Black",
    label: "Black",
  },
  {
    value: "Brown",
    label: "Brown",
  },
  {
    value: "Purple",
    label: "Purple",
  },
];

const totalCategory: any = [
  {
    value: "men",
    label: "men",
  },
  {
    value: "women",
    label: "women",
  },
];

const ModalAddProduct = (props: any) => {
  const { open, onClose, sizeDetail, cat, user } = props;
  const [totalSize, setTotalSize] = useState<any>([]);
  const [title, setTitle] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const [size, setSize] = React.useState([]);
  const [color, setColor] = React.useState([]);
  const [category, setCategory] = React.useState<any>(null);
  const [file, setFile] = useState<any>();
  const [price, setPrice] = useState<any>(0);

  const formatObjToArrSize = size?.map((item: any) => {
    return item["value"];
  });

  const formatObjToArrColor = color?.map((item: any) => {
    return item["value"];
  });

  const formatPrice = Number(price);

  const formatCategory = category?.value;

  useEffect(() => {
    const buildOptionSizeLabel = sizeDetail?.map((item: any) => {
      return {
        value: item?.size,
        label: item?.size,
      };
    });
    setTotalSize(buildOptionSizeLabel);
  }, [open]);

  const handleChangeTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const handleChangeDescription = (e: any) => {
    setDescription(e.target.value);
  };
  const handleChangeFile = (e: any) => {
    // console.log("e...", e.target.value);
    setFile(e.target.value);
  };
  const handleChangeSize = (e: any) => {
    setSize(e);
  };
  const handleChangeColor = (e: any) => {
    setColor(e);
  };
  const handleChangeCategory = (e: any) => {
    setCategory(e);
  };

  const handleChangePrice = (e: any) => {
    // e.replace(/[^a-zA-Z0-9 ]/g, "");
    setPrice(e.target.value);
  };

  const handleBtnCancel = () => {
    onClose();
    setTitle("");
    setDescription("");
    setFile("");
    setSize([]);
    setColor([]);
    setCategory(null);
    setPrice(0);
  };
  const handleBtnAdd = () => {
    const addProduct = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/products",
          {
            title: title,
            desc: description,
            img: file,
            categories: [cat, formatCategory],
            size: formatObjToArrSize,
            color: formatObjToArrColor,
            price: formatPrice,
            inStock: true,
          },
          {
            headers: {
              token: `Bearer ${user?.accessToken}`,
              // "Content-Type": "text/plain",
            },
          }
        );
        if (res?.status) {
          toast.success("Create success !", {
            position: toast.POSITION.TOP_RIGHT,
          });
          onClose();
          setTitle("");
          setDescription("");
          setFile("");
          setSize([]);
          setColor([]);
          setCategory(null);
          setPrice(0);
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
    addProduct();
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
                id="title"
                name="title"
                label="Title"
                variant="standard"
                sx={{ width: "100%" }}
                value={title}
                onChange={handleChangeTitle}
              />
            </Grid>
            <Grid item sm={12}>
              <TextareaAutosize
                id="description"
                name="description"
                aria-label="minimum height"
                maxRows={3}
                placeholder="Description"
                style={{ width: "100%" }}
                value={description}
                onChange={handleChangeDescription}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                id="file"
                label="File"
                name="file"
                variant="standard"
                sx={{ width: "100%" }}
                value={file}
                onChange={handleChangeFile}
              />
            </Grid>
            {/* <Grid item sm={12}>
              <div className="input-group mb-3">
                <input
                  type="file"
                  className="form-control"
                  id="inputGroupFile02"
                  name="file"
                  value={file}
                  onChange={handleChangeFile}
                />
                <label className="input-group-text" htmlFor="inputGroupFile02">
                  Upload
                </label>
              </div>
            </Grid> */}
            {/* <Grid item sm={12}>
              <TextField
                id="standard-select-size"
                select
                label="Select"
                value={size}
                onChange={handleChangeSize}
                helperText="Please select your size"
                variant="standard"
                sx={{ width: "100%" }}
              >
                {totalSize.map((option: any) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid> */}

            <Grid item sm={12}>
              <Select
                id="category"
                name="category"
                placeholder="Enter select category"
                value={category}
                onChange={handleChangeCategory}
                options={totalCategory}
                noOptionsMessage={() => "No more options"}
                isClearable
              />
            </Grid>

            <Grid item sm={12}>
              <Select
                id="size"
                name="size"
                placeholder="Enter select size"
                value={size}
                onChange={handleChangeSize}
                options={totalSize}
                isMulti
                noOptionsMessage={() => "No more options"}
                isClearable
              />
            </Grid>

            <Grid item sm={12}>
              <Select
                id="color"
                name="color"
                placeholder="Enter select color"
                value={color}
                onChange={handleChangeColor}
                options={totalColor}
                isMulti
                isClearable
                noOptionsMessage={() => "No more options"}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                id="price"
                label="Price"
                name="price"
                type="number"
                variant="standard"
                sx={{ width: "100%" }}
                value={price}
                onChange={handleChangePrice}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  min: 0,
                  type: "number",
                }}
              />
            </Grid>
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
        </Box>
      </Modal>
      <ToastContainer autoClose={5000} />
    </>
  );
};

export default ModalAddProduct;
