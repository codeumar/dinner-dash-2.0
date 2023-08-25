import React from "react";
import { Carousel as CarouselContainer } from "react-responsive-carousel";
import { Paper } from "@mui/material";

const items = [
  {
    id: 1,
    imageSrc: "https://source.unsplash.com/random/300×300?food",
    caption: "Food Item 1",
  },
  {
    id: 2,
    imageSrc: "https://source.unsplash.com/random/300×300?pizza",
    caption: "Pizza Item 2",
  },
  {
    id: 3,
    imageSrc: "https://source.unsplash.com/random/300×300?burger",
    caption: "Burger Item 3",
  },
];

const CarouselContainer = () => {
  return (
    <CarouselContainer showArrows={true} infiniteLoop={true} showThumbs={false}>
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </CarouselContainer>
  );
};

const Item = ({ item }) => {
  return (
    <Paper>
      <img src={item.imageSrc} alt={item.caption} />
    </Paper>
  );
};

export default CarouselContainer;
