import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const PreAccounts = db.define('PreAccounts', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  app_img: {type:DataTypes.STRING},
  app_names: {type:DataTypes.STRING}
}, {
  timestamps: true, 
});




db.sync();

export default PreAccounts;
