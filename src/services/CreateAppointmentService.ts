import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import RequestDto from '../interfaces/RequestDTO';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

class CreateAppointmentService {
  public async execute({ date, provider }: RequestDto): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const findAppointment = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointment) {
      throw Error('this appointment is already booked.');
    }

    const appointment = await appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
