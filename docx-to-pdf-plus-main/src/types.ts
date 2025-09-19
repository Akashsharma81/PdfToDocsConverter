// src/types.ts
export interface ConversionRecord {
  id?: string;               // client-side id (optional)
  _id?: string;              // mongodb _id (optional)
  originalName: string;
  convertedName: string;
  fromType: string;
  toType: string;
  timestamp: string | number | Date;
  downloadUrl?: string;
}
