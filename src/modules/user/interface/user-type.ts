import {user} from "@prisma/client";

export type ListAllUsersResponeType = {
  data: user[];
  count: number;
};
