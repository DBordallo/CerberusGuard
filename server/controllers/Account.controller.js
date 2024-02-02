import Accounts from "../models/AccountModel.js";
import { hashPassword } from "../utils/bcrypt.js";
import { decodeToken, createToken } from "../utils/jwt.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";
import UserModel from "../models/UserModel.js";

const handleServerError = (res, error) => {
    console.error(error);
    res.status(500).json({ message: error.message });
};

export const getAccounts = async (req, res) => {
    try {
        const accounts = await Accounts.findAll();
        res.json(accounts);
    } catch (error) {
        handleServerError(res, error);
    }
};

export const createAccount = async (req, res) => {
    const { app_name, email, password, user_id } = req.body;

    try {


    

        let decodedUser;

        if (!user_id) {
            const token = req.cookies.token || req.headers.authorization;

            if (!token) {
                return res.status(401).json({ error: 'No token provided' });
            }

            decodedUser = decodeToken(token);
            

            if (!decodedUser) {
                return res.status(401).json({ error: 'Invalid token' });
            }
        }

        const newAccountData = {
            app_name,
            email,
            password,
            user_id: user_id || decodedUser,
        };

        const newAccount = await Accounts.create(newAccountData);
        res.json(newAccount);
    } catch (error) {
        handleServerError(res, error);
    }
};



export const getAccount = async (req, res) => {
    const { id } = req.params;

    try {
        const account = await Accounts.findByPk(id);

        if (!account) {
            return res.status(404).json({ message: "Account does not exist" });
        }

        res.json(account);
    } catch (error) {
        handleServerError(res, error);
    }
};



export const updateAccount = async (req, res) => {
    const { id } = req.params;

    try {
        
        if (req.body.password) {
           
            req.body.password = await hashPassword(req.body.password);
        }

       
        const [updatedCount, [updatedAccount]] = await Accounts.update(req.body, { where: { id }, returning: true });

        if (updatedCount > 0) {
            res.json({ message: 'Account updated successfully', Account: updatedAccount });
        } else {
            res.status(404).json({ message: 'Account not found' });
        }
    } catch (error) {
        handleServerError(res, error);
    }
};


export const deleteAccount = async (req, res) => {
    const { id } = req.params;

    try {
        const account = await Accounts.findByPk(id);

        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        if (account.image?.public_id) {
            await deleteImage(account.image.public_id);
        }

        await account.destroy();

        res.status(204).json({ message: 'Account deleted successfully' });
    } catch (error) {
        handleServerError(res, error);
    }
};

export const getAccountByUserId = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await UserModel.findByPk(userId, { include: 'accounts' });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.json(user.accounts);
    } catch (error) {
        console.error('Error getting account by user ID:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
