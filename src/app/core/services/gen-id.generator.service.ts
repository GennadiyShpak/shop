let counter = 0;

export const genID = (): number => {
  counter += 1;
  return counter;
}
