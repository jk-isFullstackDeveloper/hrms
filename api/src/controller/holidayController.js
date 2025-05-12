import Holiday from '../models/Holiday.js';

export const getHolidays = async (req, res) => {
    const holidays = await Holiday.find();
    res.json(holidays);
};

export const addHoliday = async (req, res) => {
    const holiday = await Holiday.create(req.body);
    res.status(201).json(holiday);
};