import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const PreAccounts = db.define('PreAccounts', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  app_img: {type:DataTypes.TEXT},
  app_names: {type:DataTypes.STRING}
}, {
  timestamps: true, 
});




db.sync();

export default PreAccounts;
