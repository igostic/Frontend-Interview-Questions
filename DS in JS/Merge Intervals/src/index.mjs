/*
First sort the intervals according 
to starting time. Once we have the
sorted intervals, we can combine all
intervals in a linear traversal.
The idea is, in sorted array of
intervals, if interval[i] doesn't
overlap with interval[i-1], then
interval[i+1] can't overlap with
interval[i-1] because starting 
time of interval[i+1] must be
greater than or equal to 
interval[i].
*/
// TC = O(nlogn + O(n))

function mergeIntervals(intervals) {
  // Sort intervals by start time
  intervals.sort((a, b) => a[0] - b[0]);
  // Initialize merged intervals 
  // with the first interval
  let merged = [intervals[0]]; 

  // Iterate through the 
  // sorted intervals
  for (let i = 1; i < intervals.length; i++) {
      // Get the current interval
      let currentInterval = intervals[i]; 
      // Get the last merged interval
      let lastMergedInterval = merged[merged.length - 1]; 
      if (currentInterval[0] <= lastMergedInterval[1]) {
          // Merge intervals if they overlap
          lastMergedInterval[1] = Math.max(
            lastMergedInterval[1],
            currentInterval[1]);
      } else {
          // Add non-overlapping 
          // intervals to the result
          merged.push(currentInterval);
      }
  }
  // Return the merged intervals
  return merged; 
}

let intervals = [[1,3],[2,6],[8,10],[15,18]];
let intervals1 = [[1,3],[2,6],[8,10],[8,9],[9,11],[15,18],[2,4],[16,17]];

let mergedIntervals = mergeIntervals(intervals);
let mergedIntervals1 = mergeIntervals(intervals1);

console.log(mergedIntervals); // Output: [[1,6],[8,10],[15,18]]
console.log(mergedIntervals1); // Output: [[1,6],[8,10],[15,18]]
