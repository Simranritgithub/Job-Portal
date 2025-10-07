import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
  try {
    console.log("Incoming Cookies:", req.cookies); // 🔍 Log all cookies

    const token = req.cookies.token;
    console.log("Extracted Token:", token); // 🔍 Check if token is actually extracted

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log("JWT Verification Error:", err.message);
        return res.status(401).json({
          message: "Invalid token",
          success: false,
        });
      }

      console.log("Decoded Token Data:", decoded); // 🔍 Check token payload

      req.id = decoded.userId;
      console.log("Extracted User ID:", req.id); // ✅ Make sure userId is being set

      next();
    });

  } catch (error) {
    console.error("Error in isAuthenticated middleware:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export default isAuthenticated;
