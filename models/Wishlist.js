import sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';

const Wishlist = sequelize.define('wishlist', {
  title: {
    type: DataTypes.STRING,
  },
  owner: {
    type: DataTypes.STRING,
  },
});

Wishlist.sync();

export default Wishlist;
