// Recursive helper type to get nested keys as dot-separated strings
export type NestedKeyOf<ObjectType extends Record<string, any>> = {
  [Key in keyof ObjectType & string]: ObjectType[Key] extends Record<
    string,
    any
  >
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & string];

// Keys of en.json including nested paths
