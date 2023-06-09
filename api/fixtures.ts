import mongoose from 'mongoose';
import config from './config';
import * as crypto from 'crypto';
import User from './models/User';
import Expert from './models/Expert';
import ServiceHour from './models/ServiceHour';
import Appointment from './models/Appointment';
import Category from './models/Category';
import Message from './models/Message';

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('categories');
    await db.dropCollection('servicehours');
    await db.dropCollection('experts');
    await db.dropCollection('appointments');
    await db.dropCollection('messages');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [admin, expert3, user2, expert1, expert2] = await User.create(
    {
      email: 'admin@gmail.com',
      firstName: 'Эмир',
      lastName: 'Марат',
      password: '12345678A',
      token: crypto.randomUUID(),
      phoneNumber: '+996500368878',
      role: 'admin',
      verified: true,
    },
    {
      email: 'expert3@gmail.com',
      firstName: 'Улан',
      lastName: 'Сарыкуев',
      password: '12345678A',
      token: crypto.randomUUID(),
      phoneNumber: '+996500500500',
      role: 'expert',
      verified: true,
    },
    {
      email: 'user1@gmail.com',
      firstName: 'Улус',
      lastName: 'Эмильбеков',
      password: '12345678A',
      token: crypto.randomUUID(),
      phoneNumber: '+996501501501',
      role: 'user',
      verified: true,
    },
    {
      email: 'expert@gmail.com',
      firstName: 'Алла',
      lastName: 'Ефремова',
      password: '12345678A',
      token: crypto.randomUUID(),
      phoneNumber: '+996502502502',
      role: 'expert',
      verified: true,
    },
    {
      email: 'expert1@gmail.com',
      firstName: 'Жамиля',
      lastName: 'Таштанова',
      password: '12345678A',
      token: crypto.randomUUID(),
      phoneNumber: '+996503503503',
      role: 'expert',
      verified: true,
    },
  );

  const [hair, manicure, pedicure] = await Category.create(
    { title: 'Волосы', image: 'fixtures/hair.jpg' },
    { title: 'Маникюр', image: 'fixtures/manicure.jpg' },
    { title: 'Педикюр', image: 'fixtures/pedicure.jpg' },
  );

  const [newExpert1, newExpert2, newExpert3] = await Expert.create(
    {
      user: expert1._id,
      category: hair._id,
      title: 'Парикмахер',
      info: 'Я профессиональный парикмахер с опытом более 10 лет. Моя страсть - создавать стильные и модные прически, подчеркивая индивидуальность каждого клиента. Владею различными техниками стрижки, окрашивания и укладки волос. Заботливый и внимательный подход к каждому клиенту, высокий уровень профессионализма и использование высококачественных продуктов - мои основные принципы работы. Приходите ко мне, и я с радостью помогу вам выглядеть великолепно!',
      photo: 'fixtures/alla.jpg',
      services: [
        { name: 'Обычная стрижка', price: 400 },
        { name: 'Окрашивание волос', price: 800 },
        { name: 'Модельная стрижка', price: 600 },
      ],
    },
    {
      user: expert2._id,
      category: manicure._id,
      title: 'Мастер по маникюру',
      info:
        expert2.firstName +
        ' профессионал с творческим подходом, владеющий различными техниками маникюра, предлагающий индивидуальные решения, создающий уникальные дизайны на ногтях.',
      photo: 'fixtures/jamilya.jpg',
      services: [
        { name: 'Снятие лака', price: 500 },
        { name: 'Обычное покрытие ногтей', price: 800 },
        { name: 'Покрытие ногтей гель лаком', price: 1200 },
      ],
    },
    {
      user: expert3._id,
      category: hair._id,
      title: 'Мужской парикмахер',
      info: 'Я профессиональный барбер с более чем 10-летним опытом. Моим призванием является создание идеального образа для каждого клиента, выражающего его индивидуальность и стиль. Я владею различными техниками стрижки, бритья и ухода за бородой. В моей работе я особенно ценю заботу и внимание к каждому клиенту, а также стремлюсь к высокому профессионализму и использованию только качественных продуктов. Приходите ко мне, и я с удовольствием помогу вам выглядеть стильно и превосходно!',
      photo: 'fixtures/ulan.jpg',
      services: [
        { name: 'Обычная стрижка', price: 400 },
        { name: 'Бритье бороды и усов', price: 500 },
        { name: 'Модельная стрижка', price: 600 },
      ],
    },
  );

  const [date1, date2, date3, date4, date5] = await ServiceHour.create(
    {
      expert: newExpert1._id,
      date: new Date('2023-06-12'),
      hours: [
        { startTime: '10:00', endTime: '11:00', status: false },
        { startTime: '11:15', endTime: '12:15', status: true },
        { startTime: '13:45', endTime: '14:45', status: false },
        { startTime: '15:00', endTime: '16:00', status: true },
        { startTime: '16:15', endTime: '17:15', status: false },
        { startTime: '17:30', endTime: '18:30', status: false },
      ],
    },
    {
      expert: newExpert1._id,
      date: new Date('2023-06-13'),
      hours: [
        { startTime: '10:00', endTime: '11:00', status: false },
        { startTime: '11:15', endTime: '12:15', status: false },
        { startTime: '13:45', endTime: '14:45', status: false },
        { startTime: '15:00', endTime: '16:00', status: false },
        { startTime: '16:15', endTime: '17:15', status: false },
        { startTime: '17:30', endTime: '18:30', status: false },
      ],
    },
    {
      expert: newExpert2._id,
      date: new Date('2023-06-12'),
      hours: [
        { startTime: '10:00', endTime: '11:00', status: false },
        { startTime: '11:15', endTime: '12:15', status: false },
        { startTime: '13:45', endTime: '14:45', status: false },
        { startTime: '15:00', endTime: '16:00', status: false },
        { startTime: '16:15', endTime: '17:15', status: false },
        { startTime: '17:30', endTime: '18:30', status: false },
      ],
    },
    {
      expert: newExpert2._id,
      date: new Date('2023-06-13'),
      hours: [
        { startTime: '10:00', endTime: '11:00', status: false },
        { startTime: '11:15', endTime: '12:15', status: false },
        { startTime: '13:45', endTime: '14:45', status: false },
        { startTime: '15:00', endTime: '16:00', status: true },
        { startTime: '16:15', endTime: '17:15', status: false },
        { startTime: '17:30', endTime: '18:30', status: false },
      ],
    },
    {
      expert: newExpert3._id,
      date: new Date('2023-06-12'),
      hours: [
        { startTime: '10:00', endTime: '11:00', status: false },
        { startTime: '11:15', endTime: '12:15', status: false },
        { startTime: '13:45', endTime: '14:45', status: true },
        { startTime: '15:00', endTime: '16:00', status: false },
        { startTime: '16:15', endTime: '17:15', status: false },
        { startTime: '17:30', endTime: '18:30', status: false },
      ],
    },
  );

  await Appointment.create(
    {
      client: user2._id,
      expert: newExpert1._id,
      date: date1._id,
      service: { name: 'Обычная стрижка', price: 400 },
      startTime: '11:15',
      endTime: '12:15',
      isApproved: true,
    },
    {
      client: user2._id,
      expert: newExpert2._id,
      date: date4._id,
      service: { name: 'Снятие лака', price: 500 },
      startTime: '15:00',
      endTime: '16:00',
      isApproved: true,
    },
    {
      client: user2._id,
      expert: newExpert1._id,
      date: date1._id,
      service: { name: 'Окрашивание волос', price: 800 },
      startTime: '15:00',
      endTime: '16:00',
      isApproved: true,
    },
    {
      client: user2._id,
      expert: newExpert3._id,
      date: date5._id,
      service: { name: 'Бритье бороды и усов', price: 500 },
      startTime: '13:45',
      endTime: '14:45',
      isApproved: true,
    },
  );

  await Message.create(
    {
      username: 'Алла Ефромова',
      text: 'Маска для волос от фирмы эстель!',
      createdAt: new Date(Date.now() - 86400000),
    },
    {
      username: 'Эмир Марат',
      text: 'Стрижка была отличная! Мне все понравилось, однако, считаю, что сайт следовало бы доработать!',
      createdAt: new Date(Date.now() - 86400000),
    },
    {
      username: 'Джон Доу',
      text: 'Мастер Алла была очень вежливой, я обязательно вернусь и всем советую',
      createdAt: new Date(Date.now() - 86400000),
    },
    {
      username: 'Нурзада Жакупова',
      text: 'Ребят, а посоветуйте средство для ухода за волосами после окрашивания? Мастер Алла советовала, но я забыла.',
      createdAt: new Date(Date.now() - 86400000),
    },
  );

  await db.close();
};
void run();
