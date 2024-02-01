import { DataTypes } from 'sequelize';
import { UUIDV4 } from "sequelize";
import bcrypt from 'bcrypt';
import db from '../database/db.js';
import PreAccounts from './PreAccountModel.js';

const Accounts = db.define('Account', {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4(),
    primaryKey: true,
    allowNull: false,
  },
  img: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  app_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(value, salt);
      this.setDataValue('password', hashedPassword);
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      },
    PreAccounts: {
      type: DataTypes.STRING,
      allowNull: false,
      }  
  },
}, {
  timestamps: true, 
});

Accounts.belongsTo(PreAccounts, { foreignKey: 'PreAccounts', as: "preAccounts" });
PreAccounts.hasMany(Accounts, { foreignKey: 'PreAccounts', as: 'Accounts' });



db.sync();

export default Accounts;
