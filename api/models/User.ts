import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { HydratedDocument, model, Model, Schema } from 'mongoose';
import { IUser } from '../types';

const SALT_WORK_FACTOR = 10;

interface IUserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

type UserModel = Model<IUser, Record<string, never>, IUserMethods>;

enum Role {
  User = 'user',
  Expert = 'expert',
  Admin = 'admin',
}

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: async function (
          this: HydratedDocument<IUser>,
          email: string,
        ): Promise<boolean> {
          if (!this.isModified('email')) return true;
          const user = await User.findOne({
            email,
          });
          return !user;
        },
        message: 'Пользователь под таким email-ом уже зарегистрирован!',
      },
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      validate: [
        {
          validator: async function (
            this: HydratedDocument<IUser>,
            phoneNumber: string,
          ): Promise<boolean> {
            if (!phoneNumber) {
              return true;
            }

            if (!this.isModified('phoneNumber')) {
              return true;
            }

            const user = await User.findOne({
              phoneNumber,
            });

            return !user;
          },
          message: 'Пользователь с таким номером телефона уже зарегистрирован!',
        },
        {
          validator: function (phoneNumber: string): boolean {
            if (!phoneNumber) {
              return true;
            }

            const regex = /^\+996\d{9}$/;
            return regex.test(phoneNumber);
          },
          message: 'Неверный формат номера телефона!',
        },
      ],
    },
    role: {
      type: String,
      required: true,
      enum: Role,
      default: Role.User,
    },
    avatar: String,
    googleId: String,
    verifyEmailToken: {
      type: String,
      default: null,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

const User = model<IUser, UserModel>('User', UserSchema);
export default User;
