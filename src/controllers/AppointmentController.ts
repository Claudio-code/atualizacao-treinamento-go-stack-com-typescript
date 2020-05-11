/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import Appointment from '../models/Appointment';

class AppointmentController {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public index(req: Request, res: Response): Response<Appointment> {
    const appointments = this.appointmentsRepository.all();

    return res.status(200).json(appointments);
  }

  public create(req: Request, res: Response): Response<Appointment> {
    try {
      const { provider, date } = req.body;
      const parseDate = parseISO(date);

      const createAppointment = new CreateAppointmentService(
        new AppointmentsRepository(),
      );

      const appointment = createAppointment.execute({
        date: parseDate,
        provider,
      });

      return res.status(201).json(appointment);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new AppointmentController(new AppointmentsRepository());
