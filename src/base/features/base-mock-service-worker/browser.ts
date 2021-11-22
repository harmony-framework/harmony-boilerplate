/* eslint-disable import/no-extraneous-dependencies */
import { setupWorker } from 'msw';
import { handlers } from '../../../requests/mock-service-worker/handlers';

export const worker = setupWorker(...handlers);
