import { User } from "@prisma/client";
export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
};
// types.ts
export interface Theatre {
  id: string;
  nom: string;
  adresse: string;
  capacite: number;
}

export interface Campagne {
  id: string;
  lieux: string;
  nom: string;
  dateDebut?: Date;
  dateFin?: Date;
  theatreId: string;
  theatre: Theatre;
  prix: number;
  status: string;
}

export interface CampagnesResponse {
  campagnes: Campagne[];
  totalPages: number;
}

