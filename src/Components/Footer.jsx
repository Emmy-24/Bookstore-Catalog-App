import React from "react";
import styled from "styled-components";
import logo from "../images/logo.jpeg";
import facebookIcon from "../images/facebook-icon.png";
import twitterIcon from "../images/twitter-icon.png";
import youtubeIcon from "../images/youtube-icon.png";

const Footer = styled.footer`
  background-color: #0f172a;
  padding: 4rem 2rem;
  color: #e2e8f0;
  font-family: "Inter", sans-serif;
  margin-top: 4rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Branding = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const Logo = styled.img`
  width: 2.25rem;
`;

const BrandText = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.05rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const NavLink = styled.a`
  color: #cbd5e1;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: color 0.3s;

  &:hover {
    color: #fff;
  }

  &::after {
    content: "";
    display: block;
    width: 0%;
    height: 2px;
    background: #fff;
    transition: width 0.3s;
    position: absolute;
    bottom: -4px;
    left: 0;
  }

  &:hover::after {
    width: 100%;
  }
`;

const Socials = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;

  a img {
    width: 1.5rem;
    height: 1.5rem;
    filter: grayscale(100%) brightness(80%);
    transition: filter 0.3s;

    &:hover {
      filter: brightness(150%);
    }
  }
`;

const Copyright = styled.p`
  font-size: 0.875rem;
  color: #94a3b8;
  text-align: center;
  margin-top: 1.5rem;
`;

export default function CustomFooter() {
  return (
    <Footer>
      <Container>
        <Branding>
          <Logo src={logo} alt="Logo" />
          <BrandText>Web3Bridge</BrandText>
        </Branding>

        <NavLinks>
          <NavLink href="/">Home</NavLink>
          <NavLink href="about">About</NavLink>
          <NavLink href="#">Contact Us</NavLink>
          <NavLink href="shop">Shop</NavLink>
        </NavLinks>

        <Socials>
          <a href="https://facebook.com" aria-label="Facebook">
            <img src={facebookIcon} alt="Facebook" />
          </a>
          <a href="https://twitter.com" aria-label="Twitter">
            <img src={twitterIcon} alt="Twitter" />
          </a>
          <a href="https://youtube.com" aria-label="YouTube">
            <img src={youtubeIcon} alt="YouTube" />
          </a>
        </Socials>

        <Copyright>
          &copy; {new Date().getFullYear()} Web3Bridge Inc. All Rights Reserved.
        </Copyright>
      </Container>
    </Footer>
  );
}
