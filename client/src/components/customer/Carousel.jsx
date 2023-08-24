import React from "react";

const Carousel = () => {
  return (
    <div
      id="carouselExampleFade"
      className="carousel slide"
      data-ride="carousel"
      style={{ objectFit: "contain !important" }}
    >
      <div className="carousel-inner h-100 w-100" id="carousel">
        <div className="carousel-caption" style={{ zIndex: "10 " }}>
          <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="carousel-item active">
          <img
            className="d-block w-100"
            src="https://source.unsplash.com/random/300×300?food"
            alt="First slide"
          />
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src="https://source.unsplash.com/random/300×300?pizza"
            alt="Second slide"
          />
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src="https://source.unsplash.com/random/300×300?burger"
            alt="Third slide"
          />
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleControls"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleControls"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default Carousel;
