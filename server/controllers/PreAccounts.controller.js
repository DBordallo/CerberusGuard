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
        try{
            await PreAccounts.create(req.body)
            res.status(200).json({message: "This User has been added successfully!"})
        }catch (error){
            res.status(500).json({message: error})
        }
    }



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

