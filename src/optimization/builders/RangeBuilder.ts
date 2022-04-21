import { PARAMS_LOWER_BOUNDS } from '../constants/LowerBounds';
import { PARAMS_UPPER_BOUNDS } from '../constants/UpperBounds';
import { RangeI } from '../interfaces/RangeI';

export function rangesBuilder(
  lower_bounds: number[] = PARAMS_LOWER_BOUNDS,
  upper_bounds: number[] = PARAMS_UPPER_BOUNDS,
): RangeI[] {
  return lower_bounds.map((_, index) => ({ lower: lower_bounds[index], upper: upper_bounds[index] } as RangeI));
}
