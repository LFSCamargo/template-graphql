import { Module } from "@types";
import model from "./model";
import types from "./types";
import resolvers from "./resolvers";

export default {
  type: types,
  model,
  resolver: resolvers,
} as Module;
