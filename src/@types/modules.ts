import { DocumentNode } from "graphql";
import { Model } from "mongoose";
import { ResolverType } from "@types";

export interface Module {
  type: DocumentNode;
  resolver: ResolverType;
  model: Model<any>;
}

export interface Modules {
  [name: string]: Module;
}
