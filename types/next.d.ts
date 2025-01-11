import { NextApiRequest } from 'next';

declare module 'next' {
  export interface NextApiRequest {
    file?: Express.Multer.File;
  }
}
