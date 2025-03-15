const UserModel = require("../Model/UserModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

exports.userRegister = async (req, res, next) => {
    try {
        const { userDetails } = req.body;

        if (!userDetails || !userDetails.email) {
            return res.status(400).json({
                message: "Email is required",
                status: "fail"
            });
        }

        const { email, password } = userDetails; // Extract email from request body
        const findmail = await UserModel.findOne({ email });

        if (findmail) {
            return res.status(400).json({
                message: "Email already exists",
                status: "fail"
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Replace plain password with hashed password
        userDetails.password = hashedPassword;

        const newUser = await UserModel.create(userDetails);

        return res.status(200).json({
            message: "User Register successfully",
            status: "success",
            newUser
        });

    } catch (err) {
        return res.status(500).json({
            message: "User registration failed",
            error: err.message
        });
    }
};


exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
                status: "fail"
            });
        }

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
                status: "fail"
            });
        }

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
                status: "fail"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || "your_secret_key",
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Login successful",
            status: "success",
            token
        });

    } catch (err) {
        return res.status(500).json({
            message: "Login failed",
            error: err.message
        });
    }
};
