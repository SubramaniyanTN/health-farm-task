import { mergeQueryKeys } from "@barehera/query-key-factory";
import { chatKeys } from "./chat/query";
export const queries=mergeQueryKeys({chatKeys})