import db from '../database/db.js';
import { DataTypes } from 'sequelize';
import { UUIDV4 } from "sequelize";
import bcrypt from 'bcrypt';

const UserModel = db.define("users", {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4(),
        primaryKey: true,
    },
    profile_image:{type:DataTypes.STRING},
    user_name:{type:DataTypes.STRING}, 
    user_telephone:{type:DataTypes.STRING}, 
    user_email:{type:DataTypes.STRING}, 
    user_password:{type:DataTypes.STRING},
    roles:{type:DataTypes.STRING}, 
},{
    timestamps: false
})

UserModel.addHook('beforeCreate', async (user) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.user_password, saltRounds);
    user.user_password = hashedPassword;
});


export default UserModel;