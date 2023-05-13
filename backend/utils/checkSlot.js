import Tour from "../models/Tour.js";
export const checkSlots = (req, res, next) => {
  const tourId = req.body.tourId;
  Tour.findOne({ _id: tourId })
    .then((tour) => {
      if (
        tour &&
        +req.body.people.adult + +req.body.people.children > 0 &&
        tour.slots >= +req.body.people.adult + +req.body.people.children
      ) {
        next();
      } else {
        return res.status(429).json({
          success: false,
          message: "Quantity exceeded",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
