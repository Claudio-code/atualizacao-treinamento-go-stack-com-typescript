/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import Appointment from '../models/Appointment';

class AppointmentController {
  public async index(req: Request, res: Response): Promise<Response> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return res.status(200).json(appointments);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { provider, date } = req.body;
      const parseDate = parseISO(date);

      const createAppointment = new CreateAppointmentService();

      const appointment = await createAppointment.execute({
        date: parseDate,
        provider,
      });

      return res.status(201).json(appointment);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new AppointmentController();
