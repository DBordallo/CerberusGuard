import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../models/UserModel.js';
import validateUserInput from '../middlewares/validationMiddleware.js';
dotenv.config();


//POST - CREATE OF CRUD

export const createUser = async (req, res) => {
    // Invoke validateUserInput middleware here
    validateUserInput(req, res, async () => {
        try {
            await UserModel.create(req.body);
            res.status(200).json({ message: 'This User has been added successfully!' });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    });
};

// GET - REVIEW OF CRUD

export const getAllUsers = async (_req, res) => {
    try{
        const users = await UserModel.findimportAll()
        res.json(users);
    }catch (error){
        res.status(500).json({
            message: error.messge})
    }
};



//GET ONE ADMIN - REVIEW OF CRUD
export const getUser = async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.params.id);
        if (!user) {
            return res.status(500).json({ message: 'User not found' });
        }
        await UserModel.update(req.body, {where: {id:req.params.id}} );
        res.status(201).json({ message: 'The User has been found successfully!', user });
    } catch (error) {console.error(error);
        res.status(500).json({ message: error.message });
    }
};

//PUT - UPDATE OF CRUD

export const updateUser = async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.params.id);
        if (!user) {
            return res.status(500).json({ message: 'User not found' });
        }
        validateUserInput(req, res, async () => {
            await UserModel.update(req.body, { where: { id: req.params.id } });
            res.status(201).json({ message: 'The User has been updated successfully!' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.errors });
    }
};

//DELETE - DELETE OF CRUD

export const deleteUser = async (req, res) => {
    try {
        const user = await UserModel.findOne({where:{id:req.params.id}});
        console.log(user)
        if (!user) {
            return res.status(500).json({ message: 'User not found' });
        }
        await UserModel.destroy({where: {id:req.params.id}} );
        res.status(203).json({ message: 'This user has been deleted successfully!' });
    } catch (error) {console.error(error);
        res.status(500).json({ message: error.message });
    }
};


// USER Login Controller

export const loginUser = async (req, res) => {
    const { user_email, user_password } = req.body;
    try {
        const user = await UserModel.findOne({ where: { user_email } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(user_password, user.user_password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const secretKey = process.env.SECRET_KEY;
        console.log("Secret Key:", secretKey)
        const token = jwt.sign({ id: user.id, user_email: user.user_email }, secretKey);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};