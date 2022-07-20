export type ExcludeNull<T, V extends keyof T> = T & {
  [P in V]: Exclude<P, null>;
};

export type OneRequired<T, V extends keyof T> = T & { [P in V]-?: T[P] };
