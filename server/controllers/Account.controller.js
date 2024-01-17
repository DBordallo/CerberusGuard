import Accounts from "../models/AccountModel.js";
import { hashPassword } from "../utils/bcrypt.js";

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
    const { name, email, password } = req.body;

    try {
        const passwordHash = await hashPassword(password);
        const newAccount = await Accounts.create({ name, email, password: passwordHash });
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
        const deletedCount = await Accounts.destroy({ where: { id } });

        if (deletedCount > 0) {
            res.status(204).json({ message: 'Account deleted successfully' });
        } else {
            res.status(404).json({ message: 'Account not found' });
        }
    } catch (error) {
        handleServerError(res, error);
    }
};
