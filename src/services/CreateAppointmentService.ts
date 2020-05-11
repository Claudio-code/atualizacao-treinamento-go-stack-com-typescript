import { startOfHour } from 'date-fns';

import RequestDto from '../interfaces/RequestDTO';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: RequestDto): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointment = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointment) {
      throw Error('this appointment is already booked.');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
