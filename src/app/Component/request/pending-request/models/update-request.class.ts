/* eslint-disable prettier/prettier */

export class UpdateRequest {
  id!: number;
  partNumber!: string;
  description!: string;
  pickupDate!: Date;
  new!: number;
  used!: number;
  updatedAt!: Date;
  requestedBy!: number;
  updatedBy!: number;
}
