import bcrypt from "bcrypt";
import userModel from "../../../model/userModel.js";
import jwtToken from "jsonwebtoken";

const user = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log(firstName, lastName, email, password);
    const userData = await userModel.findOne({ email: email });

    if (userData) {
      res.send({ status: "failed", message: "Email Already Exists" });
    } else {
      if (firstName && lastName && email && password) {
        if (password.length >= 7) {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          const userCreate = new userModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashPassword,
          });
          await userCreate.save();
          res.send({ status: "success", message: "User Create Successfully" });
        } else {
          res.send({
            status: "failed",
            message: "Password Length must be greather 6",
          });
        }
      } else {
        res.send({ status: "Failed", message: "All field are required" });
      }
    }
  } catch (error) {
    console.log(error);
    res.send({ status: "Failed", message: "userNot create" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({ status: "Failed", message: "Enter All Field" });
    }
    const usercheck = await userModel.findOne({ email: email });
    if (!usercheck) {
      return res.send({
        status: "Failed",
        message: "Invalid Email and password",
      });
    }
    const isMatch = await bcrypt.compare(password, usercheck.password);
    if (!isMatch) {
      return res.send({ status: "Failed", message: "Invalid Password" });
    }

    const token = jwtToken.sign(
      { id: usercheck.id, email: usercheck.email },
      "ksdfi28#dk//sdfdfk",
      { expiresIn: "15m" }
    );
    res.json({
      status: "success",
      message: "Login Successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.send({ status: "failed", error });
  }
};

export default user;
export { userLogin };
