export function strategyRound(type: string, afterComa: number): Function {
  afterComa = Math.pow(10, afterComa);
  return (number: number): number => (Math as Record<string, any>)[type](number * afterComa) / afterComa;
}
