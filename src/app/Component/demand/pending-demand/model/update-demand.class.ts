/* eslint-disable prettier/prettier */

export class UpdateDemand {
  id!: number;
  partNumber!: string;
  serialNumber!: string;
  description!: string;
  quantity!: number;
  returnedAt!: Date;
  updatedAt!: Date;
  demandedBy!: number;
  updatedBy!: number;
}
