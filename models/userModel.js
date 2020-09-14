/** @format */

const { Schema, model } = require('mongoose');
const { genSaltSync, hashSync, compareSync } = require('bcryptjs');

const UserSchema = new Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, unique: true, required: true },
    password: { type: String, trim: true },
    avatar: { type: String },
  },
  { timestamps: true }
);

class User {
  async setPassword(password) {
    const salt = genSaltSync(12);
    this.password = hashSync(password, salt);
    await this.save();
  }
  static comparePassword(password) {
    return compareSync(password, this.password);
  }
}

UserSchema.loadClass(User);
module.exports = model('user', UserSchema);
