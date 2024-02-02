import db from '../database/db.js';
import { DataTypes } from 'sequelize';
import { UUIDV4 } from "sequelize";
import Accounts from './AccountModel.js';


const UserModel = db.define("users", {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4(),
        primaryKey: true,
    },
    profile_img:{type:DataTypes.TEXT},
    user_name:{type:DataTypes.STRING},
    user_telephone:{type:DataTypes.STRING}, 
    user_email:{type:DataTypes.STRING}, 
    user_password:{type:DataTypes.STRING},
    roles:{type:DataTypes.STRING}, 
},{
    timestamps: false
})

Accounts.belongsTo(UserModel, { foreignKey: 'user_id', as: "user" });
UserModel.hasMany(Accounts, { foreignKey: 'user_id', as: 'accounts' });


export default UserModel;