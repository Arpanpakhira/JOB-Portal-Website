import userModel from "../models/userModel.js"

export const updateUserController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email) {
            return next("Please Provide all fields!");
        }

        const user = await userModel.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name;
        user.email = email;

        if (password) {
            user.password = password; // pre-save hook will hash
        }

        await user.save();

        const token = user.createJWT();

        res.status(200).json({
            success: true,
            user,
            token,
        });
    } catch (error) {
        next(error);
    }
};
