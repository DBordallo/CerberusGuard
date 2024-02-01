import PreAccounts from "../models/PreAccountModel.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";

const handleServerError = (res, error) => {
    console.error(error);
    res.status(500).json({ message: error.message });
};

export const getPreAccounts = async (req, res) => {
    try {
        const preaccounts = await PreAccounts.findAll();
        res.json(preaccounts);
    } catch (error) {
        handleServerError(res, error);
    }
};

export const createPreAccount = async (req, res) => {
    const { app_name, img } = req.body;
    try {

        if (!img) {
            return res.status(400).json({ error: 'La imagen es requerida para crear.' });
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

        const newPreAccountData = {
            app_name,
            img: AccImage, 
        };

        const newPreAccount = await PreAccounts.create(newPreAccountData);
        res.json(newPreAccount);
    } catch (error) {
        handleServerError(res, error);
    }
};



export const getPreAccount = async (req, res) => {
    const { id } = req.params;

    try {
        const preaccount = await PreAccounts.findByPk(id);

        if (!preaccount) {
            return res.status(404).json({ message: "PreAccount does not exist" });
        }

        res.json(preaccount);
    } catch (error) {
        handleServerError(res, error);
    }
};


export const deletePreAccount = async (req, res) => {
    const { id } = req.params;

    try {
        const preaccount = await PreAccounts.findByPk(id);

        if (!preaccount) {
            return res.status(404).json({ message: 'PreAccount not found' });
        }

        if (preaccount.image?.public_id) {
            await deleteImage(preaccount.image.public_id);
        }

        await preaccount.destroy();

        res.status(204).json({ message: 'PreAccount deleted successfully' });
    } catch (error) {
        handleServerError(res, error);
    }
};

