import Accounts from "../models/AccountModel.js";
import { hashPassword } from "../utils/bcrypt.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";

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
    const { app_name, email, password, img } = req.body;

    try {
        if (!img) {
            return res.status(400).json({ error: 'La imagen es requerida para crear una cuenta.' });
        }

        const AccImage = {
            public_id: '',
            secure_url: '',
        };

        const result = await uploadImage(`data:image/jpeg;base64,${img}`);

        if (result) {
            AccImage.public_id = result.public_id;
            AccImage.secure_url = result.secure_url;
        }
        

        const newAccountData = {
            app_name:"2l",
            email: "hello@gmail.com",
            password: "adsadsa:",
            img: AccImage,
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
