import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import UserModel from "../models/UserModel.js";
import { createToken } from "../utils/jwt.js";

const saltRounds = 10;

const authController = {
    Register: async (req, res) => {
        try {
            const { user_email, user_password, ...userData } = req.body;

            const existingUser = await UserModel.findOne({ where: { user_email } });

            if (existingUser) {
                return res.status(400).send("Email already in use");
            }

            const hashedPassword = await hashPassword(user_password, saltRounds);

            const newUser = await UserModel.create({
                user_email,
                user_password: hashedPassword,
                roles: "user",
                ...userData,
            });

            return res.status(201).json({ message: "User Created" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },


    Login: async (req, res) => {
        try {
            const { user_email, user_password } = req.body;
            

            const user = await UserModel.findOne({ where: { user_email } });

            console.log(user)

            if (!user || !(await comparePassword(user_password, user.user_password))) {
                return res.status(401).json({ message: "Invalid Email or Password" });
            }

            const token = createToken(user.id);

            res.cookie("token", token, { httpOnly: true });

            return res.status(200).json(token);
            
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    Logout: (_req, res) => {
        try {
            res.clearCookie("token");
            return res.status(200).json({ message: "Logout successful" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
        },
};

export default authController;
