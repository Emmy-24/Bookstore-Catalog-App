import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";


const Container = styled.div`
  position: relative;
`;

const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 5rem;
  padding-bottom: 6rem;
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  max-width: 1024px;
  width: 100%;
`;

const CardBody = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

const InfoBlock = styled.div`
  margin-bottom: 1rem;
`;

const ExternalLinks = styled.div`
  margin-top: 1rem;
`;

const StyledLink = styled.a`
  color: #3182ce;
  text-decoration: underline;
  margin-right: 1rem;

  &:hover {
    text-decoration: none;
  }
`;

const BackLink = styled(Link)`
  font-size: 0.875rem;
  color: #4a5568;
  text-decoration: underline;
  margin-top: 2rem;
  display: inline-block;

  &:hover {
    text-decoration: none;
  }
`;
const AddToCartButton = styled.button`
  padding: 0.75rem 2rem;
  font-weight: bold;
  border-radius: 0.375rem;
  background-color: #48bb78; /* Green color */
  color: #ffffff;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #38a169;
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.5);
    outline: none;
  }

  transition: background-color 0.3s;
`;

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch("/books.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((b) => b.id === id);
        setBook(found);
      });
  }, [id]);

  if (!book) return <p>Loading...</p>;

  const info = book.volumeInfo;

  return (
    <Container>
      <Content>
        <CardWrapper>
          <Card>
            <CardBody>
              <Title>{info.title}</Title>
              <InfoBlock>
                <Text><strong>Author(s):</strong> {info.authors?.join(", ") || "Unknown"}</Text>
                <Text><strong>Genre:</strong> {info.categories?.join(", ") || "N/A"}</Text>
                <Text><strong>Publisher:</strong> {info.publisher || "N/A"}</Text>
                <Text><strong>Published Date:</strong> {info.publishedDate || "N/A"}</Text>
                <Text><strong>Description:</strong> {info.description || "No description available."}</Text>
                <Text><strong>Price:</strong> {book.price ? `$${book.price}` : "$0"}</Text>
              </InfoBlock>
              <ExternalLinks>
                <StyledLink href={info.previewLink} target="_blank" rel="noreferrer">Preview</StyledLink>
                <StyledLink href={info.infoLink} target="_blank" rel="noreferrer">More Info</StyledLink>
              </ExternalLinks>
              <AddToCartButton>Add to Cart</AddToCartButton>
              <BackLink to="/Shop">← Back to Shop</BackLink>
            </CardBody>
          </Card>
        </CardWrapper>
      </Content>
    </Container>
  );
};

export default BookDetails;
