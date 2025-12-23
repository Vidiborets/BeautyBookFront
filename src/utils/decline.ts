function decline(
  number: number,
  nominative: string,
  genetive: string,
  plural: string,
): string {
  const ii = number % 100;
  if (ii >= 11 && ii <= 19) {
    return plural;
  }

  const i = number % 10;
  switch (i) {
    case 1:
      return nominative;
    case 2:
    case 3:
    case 4:
      return genetive;
    default:
      return plural;
  }
}

export { decline };
