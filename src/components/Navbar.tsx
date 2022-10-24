import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/userRedux";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quantity = useSelector((state: any) => state?.cart?.quantity);
  const user = useSelector((state: any) => state?.user?.currentUser);

  const [hover, setHover] = useState<any>(false);

  const handleClickLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleClickLogin = () => {
    navigate("/login");
  };

  const handleMouseEnterImg = () => {
    setHover(true);
  };

  const handleMouseLeaveImg = () => {
    setHover(false);
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            <Language>EN</Language>
            <SearchContainer>
              <Input placeholder="Search" />
              <Search style={{ color: "gray", fontSize: 16 }} />
            </SearchContainer>
          </Left>
          <Center>
            <Logo>Shop Web</Logo>
          </Center>
          <Right>
            {!user ? (
              <>
                <MenuItem>REGISTER</MenuItem>
                <MenuItem onClick={handleClickLogin}>LOGIN</MenuItem>
              </>
            ) : (
              <>
                <div>
                  <img
                    src="https://is4.fwrdassets.com/images/p/fw/45/BALF-WA243_V1.jpg"
                    alt=""
                    style={{
                      height: "25px",
                      width: "25px",
                      borderRadius: "50%",
                      cursor: "pointer",
                      position: "relative",
                    }}
                    onMouseEnter={handleMouseEnterImg}
                  />
                  {!hover ? (
                    <></>
                  ) : (
                    <MenuItem
                      style={{
                        position: "absolute",
                        background: "#FFF",
                        height: "50px",
                        width: "100px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        top: "80px",
                        right: "10px",
                        zIndex: "100",
                      }}
                      onClick={handleClickLogout}
                      onMouseLeave={handleMouseLeaveImg}
                    >
                      LOGOUT
                    </MenuItem>
                  )}
                </div>
              </>
            )}
            <Link to="/cart">
              <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </Link>
          </Right>
        </Wrapper>
      </Container>
    </>
  );
};

export default Navbar;
