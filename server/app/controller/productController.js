const sharp = require('sharp');
const Product = require('../models/productModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { s3 } = require('../config/middlewares/aws');
const SubUser = require('../models/sub_user');
const Interested = require('../models/interestList');
const { premiumCompanyValidator } = require('./company');

exports.premiumProductValidator = premiumCompanyValidator(Product, 'companyId');

exports.createProduct = catchAsync(async (req, res, next) => {
  if (!req.body.currency || !req.body.amount)
    return next(new AppError('currency and amount are required field', 401));
  let compId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subuser = SubUser.findOne({ user_id: req.decodedData.id });
    compId = subuser.comp_id;
  }
  const newProduct = await Product.create({
    ...req.body,
    companyId: compId,
    price: {
      currency: req.body.currency,
      amount: req.body.amount,
    },
  });
  res.status(201).json({
    status: 'success',
    isSuccess: true,
    message: 'product successfully created',
    data: newProduct,
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const documentCount = await Product.countDocuments({
    isActive: true,
    isDeleted: false,
  });
  const features = new APIFeatures(
    Product.find({ isActive: true, isDeleted: false }),
    req.query
  )
    .search('name')
    .filter()
    .sort()
    .fields()
    .paginate();

  let products = await features.query.populate({
    path: 'companyData',
    select: 'comp_info.comp_name',
  });
  products = JSON.parse(JSON.stringify(products));
  products.map((product) => {
    if (product.media.length < 1) {
      return;
    }
    product.media.map((file) => {
      if (
        file.fileName !== null &&
        file.fileName.startsWith('company/productsMedia/CompanyProductsMedia')
      ) {
        file.filePath = `${process.env.AWS_STATIC_URL}/${file.fileName}`;
        return;
      }
      file.filePath = '';
    });
  });
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    totalCount: documentCount,
    currenctPage: parseInt(req.query.page, 10) || 1,
    totalPages:
      documentCount % limit === 0
        ? documentCount / limit
        : parseInt(documentCount / limit, 10) + 1,
    results: products.length,
    data: products,
  });
});

exports.getProductWithSponsored = catchAsync(async (req, res, next) => {
  const actualLimit = req.query.limit || 10;
  // const currentPage = parseInt(req.query.page, 10) || 1;

  //SPONSORED JOBS LIST
  req.query.limit = 2;
  let totalCount;
  totalCount = Product.countDocuments({
    isDeleted: { $ne: true },
    isActive: true,
    isSpnsored: true,
    sponsorExpiresAt: { $gte: Date.now() },
  });
  const sponsoredFeatures = new APIFeatures(
    Product.find({
      isDeleted: { $ne: true },
      isActive: true,
      isSponsored: true,
      sponsorExpiresAt: { $gte: Date.now() },
    }).sort('-clicksPerDay -totalCLicks'),
    req.query
  )
    .search('name')
    .filter()
    .sort()
    .fields()
    .paginate(2);

  let sponsoredProducts = sponsoredFeatures.query.populate({
    path: 'companyData',
  });

  let [count, sProducts] = await Promise.all([totalCount, sponsoredProducts]);
  console.log(count, sProducts);

  sProducts = JSON.parse(JSON.stringify(sProducts));
  sProducts.map((product) => {
    if (product.media.length < 1) {
      return;
    }
    product.media.map((file) => {
      if (
        file.fileName !== null &&
        file.fileName.startsWith('company/productsMedia/CompanyProductsMedia')
      ) {
        file.filePath = `${process.env.AWS_STATIC_URL}/${file.fileName}`;
        return;
      }
      file.filePath = '';
    });
  });

  //NON SPONSORED JOBS LIST
  req.query.limit = count === 0 ? actualLimit : actualLimit - count;
  const limit = req.query.limit;
  const currentPage = parseInt(req.query.page, 10) || 1;
  const nonSponQuery = {
    isActive: true,
    isSpnsored: { $ne: true },
    isDeleted: { $ne: true },
  };
  const productCount = await Product.countDocuments(nonSponQuery);
  const features = new APIFeatures(Product.find(nonSponQuery), req.query)
    .search('name')
    .filter()
    .sort()
    .fields()
    .paginate();

  let productList = features.query.populate({
    path: 'companyData',
  });

  // console.log(productList);

  let [nonSponCount, products] = await Promise.all([productCount, productList]);
  // console.log(nonSponCount);

  products = JSON.parse(JSON.stringify(products));

  products.map((product) => {
    if (product.media.length < 1) {
      return;
    }
    product.media.map((file) => {
      if (
        file.fileName !== null &&
        file.fileName.startsWith('company/productsMedia/CompanyProductsMedia')
      ) {
        file.filePath = `${process.env.AWS_STATIC_URL}/${file.fileName}`;
        return;
      }
      file.filePath = '';
    });
  });

  const data = [...sProducts, ...products];
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    currentPage,
    totalCount: nonSponCount + count,
    totalPages:
      ((nonSponCount + count) / actualLimit) % actualLimit
        ? parseInt((nonSponCount + count) / actualLimit, 10) + 1
        : (nonSponCount + count) / actualLimit,
    results: data.length,
    data,
  });
});

exports.getAllProductsByCompany = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  let compId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subuser = SubUser.findOne({ user_id: req.decodedData.id });
    compId = subuser.comp_id;
  }
  const documentCount = await Product.countDocuments({
    companyId: compId,
    isDeleted: false,
  });
  const features = new APIFeatures(
    Product.find({ companyId: compId, isDeleted: false }),
    req.query
  )
    .search('name')
    .filter()
    .sort()
    .fields()
    .paginate();

  let products = await features.query.populate({
    path: 'companyData',
    select: 'comp_info.comp_name',
  });
  products = JSON.parse(JSON.stringify(products));
  products.map((product) => {
    product.media.map((file) => {
      if (
        file.fileName !== null &&
        file.fileName.startsWith('company/productsMedia/CompanyProductsMedia')
      ) {
        file.filePath = `${process.env.AWS_STATIC_URL}/${file.fileName}`;
        return;
      }
      file.filePath = '';
    });
  });
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    totalCount: documentCount,
    currenctPage: parseInt(req.query.page, 10) || 1,
    totalPages:
      documentCount % limit === 0
        ? documentCount / limit
        : parseInt(documentCount / limit, 10) + 1,
    results: products.length,
    data: products,
  });
});

exports.getOneProduct = catchAsync(async (req, res, next) => {
  let product = await Product.findById(req.params.productId).populate({
    path: 'companyData',
  });
  if (!product)
    return next(new AppError('product with this id not found', 404));
  product = JSON.parse(JSON.stringify(product));
  let isInterested = false;
  let myEntity = false;
  if (req.isAuth) {
    await Interested.findOne({
      interestType: 'PRODUCT',
      interestId: product._id,
      userId: req.decodedData.id,
    }).then((data) => {
      if (!data) {
        isInterested = false;
        return;
      }
      isInterested = true;
    });
    myEntity = product.companyId == req.decodedData.id ? true : false;
  }
  product.media.map((file) => {
    if (
      file.fileName !== null &&
      file.fileName.startsWith('company/productsMedia/CompanyProductsMedia')
    ) {
      file.filePath = `${process.env.AWS_STATIC_URL}/${file.fileName}`;
      return;
    }
    file.filePath = '';
  });

  res.status(200).json({
    status: 'success',
    isSuccess: true,
    isInterested,
    myEntity,
    data: product,
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  if (req.body.comanyId)
    return next(new AppError('companyId cannot be updated', 401));
  if (req.body.isDeleted || req.body.isActive)
    return next(
      new AppError(
        'this route does not accept media, isActive and isDeleted fields, please use their dedicated routes',
        401
      )
    );

  let compId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subuser = SubUser.findOne({ user_id: req.decodedData.id });
    compId = subuser.comp_id;
  }
  const product = await Product.findOne({
    companyId: compId,
    _id: req.params.productId,
    isDeleted: { $ne: true },
  });
  if (!product)
    return next(
      new AppError('Product with this Id not found in your account', 404)
    );
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: 'product updated successfully',
    data: updatedProduct,
  });
});

exports.uploadProductMedia = catchAsync(async (req, res, next) => {
  let compId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subuser = SubUser.findOne({ user_id: req.decodedData.id });
    compId = subuser.comp_id;
  }
  const product = await Product.findOne({
    _id: req.params.productId,
    companyId: compId,
    isDeleted: { $ne: true },
  });
  if (!product)
    return next(
      new AppError('product with this id not found in your account', 404)
    );
  let data = [];
  console.log(req.body.productMediaData);
  if (req.body.productMediaData) {
    await Promise.all(
      req.body.productMediaData.map(async (file, i) => {
        if (file.type === 'image') {
          const filename = `${req.decodedData.id}-${Date.now()}.jpeg`;
          const processedImage = await sharp(file.buffer)
            .toFormat('jpeg')
            .jpeg({ quality: 70 })
            .toBuffer();
          const uploadedFile = await s3
            .upload({
              Bucket: process.env.AWS_BUCKET_COMPANY_PRODUCTS_MEDIA,
              Key: filename,
              Body: processedImage,
              ACL: 'public-read',
            })
            .promise();
          console.log(uploadedFile);
          data.unshift({
            fileType: file.type,
            fileName: uploadedFile.Key,
          });
        }
        if (file.type === 'video') {
          const fileName = `${req.decodedData.id}-${Date.now()}.${file.ext}`;
          const uploadedFile = await s3
            .upload({
              Bucket: process.env.AWS_BUCKET_COMPANY_PRODUCTS_MEDIA,
              Key: fileName,
              Body: file.buffer,
              ACL: 'public-read',
            })
            .promise();
          data.unshift({
            fileType: file.type,
            fileName: uploadedFile.Key,
          });
        }
      })
    );
  }
  console.log(data);
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    {
      $push: { media: { $each: data, $position: 0 } },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: 'media uploaded successfully',
    data: updatedProduct,
  });
});

exports.deleteProductMedia = catchAsync(async (req, res, next) => {
  let compId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subuser = SubUser.findOne({ user_id: req.decodedData.id });
    compId = subuser.comp_id;
  }
  const product = await Product.findOne({
    _id: req.params.productId,
    companyId: compId,
    isDeleted: { $ne: true },
  });
  if (!product)
    return next(
      new AppError('Product with this id does not found in your account', 404)
    );
  // console.log(product.media);
  const mediaList = product.media.filter((val) => {
    // console.log(val._id != req.params.mediaId, val._id, req.params.mediaId);
    if (val._id != req.params.mediaId) return val;
  });
  // console.log(mediaList);
  product.media = mediaList;
  await product.save({
    validateBeforeSave: false,
  });
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: 'media deleted successfully',
    data: product,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  let compId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subuser = SubUser.findOne({ user_id: req.decodedData.id });
    compId = subuser.comp_id;
  }
  const product = await Product.findOne({
    _id: req.params.productId,
    companyId: compId,
    isDeleted: { $ne: true },
  });
  if (!product)
    return next(
      new AppError('Product with this id does not found in your account', 404)
    );
  product.isDeleted = true;
  await product.save();
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: 'product has been successfully deleted',
    data: product,
  });
});

exports.toggleStatus = catchAsync(async (req, res, next) => {
  let compId = req.decodedData.id;
  if (req.decodedData.user_type === 3) {
    const subuser = SubUser.findOne({ user_id: req.decodedData.id });
    compId = subuser.comp_id;
  }
  const product = await Product.findOne({
    _id: req.params.productId,
    companyId: compId,
    isDeleted: { $ne: true },
  });
  if (!product)
    return next(
      new AppError('Product with this id does not found in your account', 404)
    );
  product.isActive = !product.isActive;
  await product.save();
  res.status(200).json({
    status: 'success',
    isSuccess: true,
    message: `product status changed to ${product.isActive}`,
    data: product,
  });
});
