import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ModalAddProduct from "../modal/ModalAddProduct";
import axios from "axios";
import ModalAddSize from "../modal/ModalAddSize";
import { useSelector } from "react-redux";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const user = useSelector((state: any) => state?.user?.currentUser);
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const [openModalAddProduct, setOpenModalAddProduct] =
    useState<boolean>(false);
  const [openModalAddSize, setOpenModalAddSize] = useState<boolean>(false);
  const [sizeDetail, setSizeDetail] = useState<any>([]);

  const handleFilters = (
    fieldName?: string | any,
    filedValue?: string | any
  ) => {
    const newDataFilter: any = { ...filters };
    newDataFilter[fieldName] = filedValue;
    setFilters(newDataFilter);
  };

  const handleClickOpenModalAddProduct = () => {
    setOpenModalAddProduct(true);
  };

  const handleCloseModalProduct = () => {
    setOpenModalAddProduct(false);
  };

  const handleClickOpenModalAddSize = () => {
    setOpenModalAddSize(true);
  };

  const handleCloseModalSize = () => {
    setOpenModalAddSize(false);
  };

  useEffect(() => {
    const getSizes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/sizes", {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        });
        const sizeData = res?.data;
        setSizeDetail(sizeData);
      } catch (error) {
        console.log(error);
      }
    };
    getSizes();
  }, [cat, openModalAddSize]);

  return (
    <>
      <ModalAddProduct
        open={openModalAddProduct}
        onClose={handleCloseModalProduct}
        sizeDetail={sizeDetail}
        cat={cat}
        user={user}
      />
      <ModalAddSize
        open={openModalAddSize}
        onClose={handleCloseModalSize}
        user={user}
      />
      <Container>
        <Navbar />
        <Announcement />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title>Dresses</Title>
          <div>
            <Button
              variant="contained"
              size="small"
              sx={{ height: "40px", margin: "20px 10px", width: "150px" }}
              onClick={handleClickOpenModalAddSize}
            >
              ADD SIZE
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ height: "40px", margin: "20px", width: "150px" }}
              onClick={handleClickOpenModalAddProduct}
            >
              ADD PRODUCT
            </Button>
          </div>
        </div>
        <FilterContainer>
          <Filter>
            <FilterText>Filter Products:</FilterText>
            <Select
              name="color"
              onChange={(e) => handleFilters("color", e.target.value)}
            >
              <Option disabled>Color</Option>
              <Option>white</Option>
              <Option>black</Option>
              <Option>red</Option>
              <Option>brown</Option>
              <Option>yellow</Option>
              <Option>green</Option>
            </Select>
            <Select
              name="size"
              onChange={(e) => handleFilters("size", e.target.value)}
            >
              <Option disabled>Size</Option>
              {sizeDetail?.map((item: any) => (
                <Option key={item?._id}>{item?.size}</Option>
              ))}
            </Select>
          </Filter>
          <Filter>
            <FilterText>Sort Products:</FilterText>
            <Select onChange={(e) => setSort(e.target.value)}>
              <Option value="newest">Newest</Option>
              <Option value="asc">Price (asc)</Option>
              <Option value="desc">Price (desc)</Option>
            </Select>
          </Filter>
        </FilterContainer>
        <Products
          cat={cat}
          filters={filters}
          sort={sort}
          open={openModalAddProduct}
        />
        <Newsletter />
        <Footer />
      </Container>
    </>
  );
};

export default ProductList;
