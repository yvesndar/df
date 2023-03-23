/* eslint-disable prettier/prettier */

export class NewPurchase {
  partNumber!: string;
  serialNumber!: string;
  description!: string;
  purchaseOrderNumber!: string;
  quantity!: number;
  pricePerUnit!: number;
  total!: number;
  receivedBy!: number;
  invoiceNumber!: string;
  currency!: string;
  exchange!: number;
  packing!: string;
  vendorName!: string;
  vendorAddress!: string;
  shelflife!: Date;
}
