import User from "../models/userModel.js";

/* ================= REGISTER ================= */
export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all fields",
            });
        }

        // check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // create user (password auto-hashed by pre save)
        const user = await User.create({
            name,
            email,
            password,
        });

        const token = user.createJWT();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in Register API",
        });
    }
};

/* ================= LOGIN ================= */
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password",
            });
        }

        // find user
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = user.createJWT();

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in Login API",
        });
    }
};
