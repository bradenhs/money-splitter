/**
 * Split the provided 'amount' evenly into 'count' divisions where the sum of divisions equals
 * count exactly - each division will be off by at most .01 from the other divisions
 * @param amount The amount of money to split (must have at most two decimal places)
 * @param count The number of divisions to split the amount into (must be positive integer)
 */
export function splitMoney(amount: number, count: number) {
  if (amount < 0 || Math.round(amount * 100) !== amount * 100) {
    throw new Error(`The provided amount may have at most two decimal places and must be positive`)
  }

  if (count < 1 || Math.round(count) !== count) {
    throw new Error(`The provided count must be a positive integer`)
  }

  const splitAmounts = splitNum(amount, count)
  console.log(`Result of splitNum(${amount}, ${count})`, splitAmounts)

  const fixedSplitAmounts = fixSplit(splitAmounts, amount)
  console.log(`Result of fixSplit(${amount}, ${count})`, fixedSplitAmounts)

  return fixedSplitAmounts
}

/**
 * Creates an array of values all equal to the amount divided by count (rounding up)
 * @param amount The amount to split
 * @param count The number of divisions to split amount into
 */
function splitNum(amount: number, count: number) {
  const splitAmount = Math.ceil(amount * 100 / count) / 100

  return new Array(count).fill(splitAmount)
}

/**
 * Returns a new array where values sum exactly to the total.
 * @param splitAmounts The intial array of values whose sum is either greater than or equal to total
 * @param total The total amount to ensure the divisions sum to
 */
function fixSplit(splitAmounts: number[], total: number) {
  const fixedAmounts = [ ...splitAmounts ]

  while (fixedAmounts.reduce((amount, sum) => amount + sum, 0) > total) {
    fixedAmounts.sort((a, b) => a < b ? 1 : -1)[0] -= .01
  }

  return fixedAmounts
}
