import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const PreAccounts = db.define('PreAccount', {
  id: {
    type: DataTypes.STRING,
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
}, {
  timestamps: true, 
});




db.sync();

export default PreAccounts;
