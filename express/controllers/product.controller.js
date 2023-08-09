const asyncHandler = require("express-async-handler");
const Product = require("../models/product.model");
const ServerError = require("../errors/ServerError");

// Filtering, sorting & pagination
const getProducts = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  // Tách các trường đặc biệt ra khỏi query
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  // Format lại các operators cho đúng cú pháp mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (macthedEl) => `$${macthedEl}`
  );
  const formatedQueries = JSON.parse(queryString);
  let colorQueryObject = {};
  if (queries?.title)
    formatedQueries.title = { $regex: queries.title, $options: "i" };
  if (queries?.category)
    formatedQueries.category = { $regex: queries.category, $options: "i" };
  if (queries?.color) {
    delete formatedQueries.color;
    const colorArr = queries.color?.split(",");
    const colorQuery = colorArr.map((el) => ({
      color: { $regex: el, $options: "i" },
    }));
    colorQueryObject = { $or: colorQuery };
  }
  let queryObject = {};
  if (queries?.q) {
    delete formatedQueries.q;
    queryObject = {
      $or: [
        { color: { $regex: queries.q, $options: "i" } },
        { title: { $regex: queries.q, $options: "i" } },
        { category: { $regex: queries.q, $options: "i" } },
        { brand: { $regex: queries.q, $options: "i" } },
        // { description: { $regex: queries.q, $options: 'i' } },
      ],
    };
  }
  const qr = { ...colorQueryObject, ...formatedQueries, ...queryObject };
  let queryCommand = Product.find(qr);

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }
  // Fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }
  // Pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);
  // Execute query
  // Số lượng sp thỏa mãn điều kiện !== số lượng sp trả về 1 lần gọi API
  // queryCommand.exec(async (err, response) => {
  //   if (err) throw new ServerError(err.message);
  //   const counts = await Product.find(qr).countDocuments();
  //   return res.status(200).json({
  //     status: response ? true : false,
  //     counts,
  //     products: response ? response : "Cannot get products",
  //   });
  // });
  //https://stackoverflow.com/questions/75603536/throw-new-mongooseerrorquery-prototype-exec-no-longer-accepts-a-callback
  queryCommand
    .exec()
    .then(async (response) => {
      const counts = await Product.find(qr).countDocuments();
      return res.status(200).json({
        status: response ? true : false,
        counts,
        products: response ? response : "Cannot get products",
      });
    })
    .catch((err) => {
      throw new ServerError(err.message);
    });
});

module.exports = {
  getProducts,
};
