import { Prisma } from "@prisma/client";

export type Materials = {
  kindKey: string;
  name: string;
  textureFilename: string;
  weight: string;
  textPrompt: string | null;
  materialQuality: string | undefined;
  category: { connect: { id: string } };
  collection?: { connect: { id: string } };
};

export type CreateData = Prisma.MaterialCreateInput;

// Add any other material-related types here 