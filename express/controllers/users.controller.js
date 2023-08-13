const asyncHandler = require("express-async-handler");
const User = require("../models/users.model");
const ServerError = require("../errors/ServerError");
// const enviromentVariables = require("../configs/envVariablesConfig");

const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select("-refreshToken -password");
  return res.status(200).json({
    status: user ? true : false,
    rs: user ? user : "User not found",
  });
});

const updateUser = asyncHandler(async (req, res) => {
  console.log("usercontroller - update user", req.file);
  const { _id } = req.user;
  const { firstname, lastname, email, mobile } = req.body;
  const data = { firstname, lastname, email, mobile };
  if (req.file) data.avatar = req.file.path;
  if (!_id || Object.keys(req.body).length === 0)
    throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(_id, data, {
    new: true,
  }).select("-password -role -refreshToken");
  return res.status(200).json({
    status: response ? true : false,
    message: response ? "Updated." : "Some thing went wrong",
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (macthedEl) => `$${macthedEl}`
  );
  const formatedQueries = JSON.parse(queryString);
  if (queries?.name)
    formatedQueries.name = { $regex: queries.name, $options: "i" };
  // const query = {}
  // if (req.query.q) {
  //     query = {$or : [
  //         {name : { $regex: req.query.q, $options: 'i' }},
  //         {email : { $regex: req.query.q, $options: 'i' }},
  //     ]}
  // }
  if (req.query.q) {
    delete formatedQueries.q;
    formatedQueries["$or"] = [
      { firstname: { $regex: req.query.q, $options: "i" } },
      { lastname: { $regex: req.query.q, $options: "i" } },
      { email: { $regex: req.query.q, $options: "i" } },
    ];
  }
  let queryCommand = User.find(formatedQueries);

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }

  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);
  queryCommand
    .exec()
    .then(async (response) => {
      const counts = await User.find(formatedQueries).countDocuments();
      return res.status(200).json({
        status: response ? true : false,
        counts,
        users: response ? response : "Cannot get products",
      });
    })
    .catch((err) => {
      throw new ServerError(err.message);
    });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  const response = await User.findByIdAndDelete(uid);
  return res.status(200).json({
    status: response ? true : false,
    message: response
      ? `User with email ${response.email} deleted`
      : "No user delete",
  });
});

const updateUserByAdmin = asyncHandler(async (req, res) => {
  //
  const { uid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(uid, req.body, {
    new: true,
  }).select("-password -role -refreshToken");
  return res.status(200).json({
    status: response ? true : false,
    message: response ? "Updated" : "Some thing went wrong",
  });
});

const userController = {
  getCurrent,
  updateUser,
  getUsers,
  deleteUser,
  updateUserByAdmin,
};

module.exports = userController;
