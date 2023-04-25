import mongoose from "mongoose";
import config from "./config";
import * as crypto from 'crypto';
import User from "./models/User";
import Expert from "./models/Expert";

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('experts');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [admin, user1, user2, expert1, expert2] = await User.create(
    {
      email: 'admin@gmail.com',
      firstName: 'Emir',
      lastName: 'Marat',
      password: '123',
      token: crypto.randomUUID(),
      phoneNumber: '+996500368878',
      role: 'admin',
    },
    {
      email: 'user@gmail.com',
      firstName: 'Ulan',
      lastName: 'Sarykuev',
      password: '123',
      token: crypto.randomUUID(),
      phoneNumber: '+996500500500',
      role: 'user',
    },
    {
      email: 'user1@gmail.com',
      firstName: 'Ulus',
      lastName: 'Emilbekov',
      password: '123',
      token: crypto.randomUUID(),
      phoneNumber: '+996501501501',
      role: 'user',
    },
    {
      email: 'expert@gmail.com',
      firstName: 'Alla',
      lastName: 'Efremova',
      password: '123',
      token: crypto.randomUUID(),
      phoneNumber: '+996502502502',
      role: 'expert',
    },
    {
      email: 'expert1@gmail.com',
      firstName: 'Jamilya',
      lastName: 'Tashtanova',
      password: '123',
      token: crypto.randomUUID(),
      phoneNumber: '+996503503503',
      role: 'expert',
    },
  );

  const [newExpert1, newExpert2] = await Expert.create(
      {
        user: expert1._id,
        title: 'Парикмахер',
        info: 'Я профессиональный парикмахер с опытом более 10 лет. Моя страсть - создавать стильные и модные прически, подчеркивая индивидуальность каждого клиента. Владею различными техниками стрижки, окрашивания и укладки волос. Заботливый и внимательный подход к каждому клиенту, высокий уровень профессионализма и использование высококачественных продуктов - мои основные принципы работы. Приходите ко мне, и я с радостью помогу вам выглядеть великолепно!',
        photo: 'fixtures/avatar1.jpg',
        services: [
          {name: 'Обычная стрижка', price: 400},
          {name: 'Окрашивание волос', price: 800},
          {name: 'Модельная стриэка', price: 600},
        ],
      },
      {
        user: expert2._id,
        title: 'Мастер по маникюру',
        info: 'Профессионал мастер с творческим подходом, владеющий различными техниками маникюра, предлагающий индивидуальные решения, создающий уникальные дизайны на ногтях. Он также консультант по уходу за ногтями, соблюдающий стандарты санитарии и гигиены, обладающий отличными навыками общения с клиентами и создающий комфортную атмосферу в салоне.',
        photo: 'fixtures/avatar2.jpg',
        services: [
          {name: 'Снятие лака', price: 500},
          {name: 'Обычное покрытие ногтей', price: 800},
          {name: 'Покрытие ногтей гель лаком', price: 1200},
        ],
      },
    );
  await db.close();
};
void run();
