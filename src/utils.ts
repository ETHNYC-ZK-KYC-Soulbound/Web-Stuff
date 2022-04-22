export function midEllipsis(input: string, maxLength: number): string {
  if (input.length <= maxLength) {
    return input;
  }

  const middle = Math.ceil(input.length / 2);
  const excess = Math.ceil((input.length - maxLength) / 2);
  return `${input.substring(0, middle - excess)}...${input.substring(
    middle + excess,
  )}`;
}
