const globalError = (err, req, res, next) => {
  // ১. প্রাথমিক ডিফেন্সিভ লকিং (যদি অলরেডি রেসপন্স চলে যায়, তবে আর কিছু করবে না)
  if (res.headersSent) {
    return next(err);
  }

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
<<<<<<< HEAD
  let error = { ...err };
  error.message = err.message;
  error.name = err.name;
  error.code = err.code; // মঙ্গুসের কোড ধরার জন্য এটি দরকার
=======
  //মঙ্গুস এররের জন্য সরাসরি অরিজিনাল err বা কাস্টম রেফারেন্স ব্যবহার করাই নিরাপদ
  let error = err;
  error.message = err.message;

>>>>>>> 62c724357e5c7a33315d1f03558b25441a366cfc

  // ১. MongoDB Duplicate Key Error (যেমন: একই আইডি বা নাম বারবার দিলে)
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue || {});
    const value = error.keyValue ? error.keyValue[field] : "unknown";
    error.message = `${field} (মান: ${value}) অলরেডি ডাটাবেজে আছে! এটি ইউনিক হতে হবে।`;
    error.statusCode = 400;
    error.status = "fail";
    error.isOperational = true; // এটি true দিলে প্রডাকশনেও আসল মেসেজ দেখাবে
  }

  // ২. Mongoose ValidationError (স্কিমার required বা min/max নিয়ম ভাঙলে)
  if (error.name === "ValidationError") {
    error.message = Object.values(err.errors).map(val => val.message).join(", ");
    error.statusCode = 400;
    error.status = "fail";
    error.isOperational = true;
  }

  // ৩. MongoDB CastError (ভুল ডাটা টাইপ পাঠালে, যেমন: Number ফিল্ডে String দিলে)
  if (error.name === "CastError") {
<<<<<<< HEAD
    error.message = `ভুল ডাটা ফরম্যাট! ${error.path} ফিল্ডে '${error.value}' ডাটাটি সঠিক নয়。`;
=======
    error.message = `ভুল ডাটা ফরম্যাট! ${error.path} ফিল্ডে '${error.value}' ডাটাটি সঠিক নয় ।`;
>>>>>>> 62c724357e5c7a33315d1f03558b25441a366cfc
    error.statusCode = 400;
    error.status = "fail";
    error.isOperational = true;
  }

  if (process.env.NODE_ENV === "development") {
    // 💡 এখানে 'return' যোগ করা হয়েছে এবং অরিজিনাল err এর জায়গায় মডিফাইড error বসানো হয়েছে
    return res.status(error.statusCode).json({
      status: error.status,
      error: err,
      message: error.message,
      stack: err.stack,
    });
  } else {
    console.error("ERROR " + err);
    // 💡 এখানে 'return' যোগ করা হয়েছে যেন কোড ডাবল রেসপন্স না পাঠায়
    return res.status(error.statusCode).json({
      status: error.status,
<<<<<<< HEAD
      message: error.isOperational ? error.message : "Something went wrong", // 'want' টাইপোটি 'went' করা হয়েছে
=======
      message: error.isOperational ? error.message : "Something went wrong",
>>>>>>> 62c724357e5c7a33315d1f03558b25441a366cfc
    });
  }
};

export default globalError;
