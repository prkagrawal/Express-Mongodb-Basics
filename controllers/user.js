// init code
const router = require("express").Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("./../models/user");

//To create another model from this model
// const anotherUser = new User();

//  middleware setup
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// routes goes here

//default route
router.all("/", function (req, res) {
  return res.json({
    status: true,
    message: "User controller working...",
  });
});

//  create new user route
router.post(
  "/createNew",
  [
    // check not empty field
    check("username").not().isEmpty().trim().escape(),
    check("password").not().isEmpty().trim().escape(),
    check("email").isEmail(),
  ],
  function (req, res) {
    //  check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        status: false,
        message: "Form validation error.",
        errors: errors.array(),
      });
    }

    // hash password code
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    // output data to user
    // return res.json({
    //   status: true,
    //   message: "User data Ok...",
    //   data: req.body,
    //   hashedPassword: hashedPassword,
    // });

    // Inserting data with Create function
    // User.create(
    //   {
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: hashedPassword,
    //   },
    //   function (error, result) {
    //     // check error
    //     if (error) {
    //       return res.json({
    //         status: faise,
    //         message: "DB insert fail...",
    //         error: error,
    //       });
    //     }

    //     // if everything OK
    //     return res.json({
    //       status: true,
    //       message: "DB insert Success...",
    //       result: result,
    //     });
    //   }
    // );

    // Inserting data with save function
    // create new user model
    var temp = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // insert data into database
    temp.save(function (error, result) {
      // check error
      if (error) {
        return res.status(500).json({
          status: false,
          message: "DB insert fail...",
          error: error,
        });
      }

      //  everything ok
      return res.status(200).json({
        status: true,
        message: "DB insert success...",
        result: result,
      });
    });
  }
);

// module exports
module.exports = router;
