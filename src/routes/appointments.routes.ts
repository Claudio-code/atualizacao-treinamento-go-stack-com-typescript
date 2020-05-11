import { Router } from 'express';

import AppointmentController from '../controllers/AppointmentController';

const appointmentsRoutes = Router();

appointmentsRoutes.get('/', AppointmentController.index);
appointmentsRoutes.post('/', AppointmentController.create);

export default appointmentsRoutes;
