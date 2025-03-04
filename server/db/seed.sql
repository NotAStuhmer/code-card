INSERT INTO snippets (title, description, difficulty, code)
VALUES
('FizzBuzz', 'Classic interview problem', 'Easy', 'for (let i = 1; i <= 100; i++){ console.log i % 3 === 0 ? (i % 5 === 0 ? "FizzBuzz" : "Fizz") : (i % 5 === 0 ? "Buzz" : i)}; '),
('Binary Search', 'Search for an element in a sorted array.', 'Medium', 'function binarySearch(arr, tar) { let left = 0, right = arr.length - 1; while (left <= right) { let mid = Math.floor((left + right) / 2); if (arr[mid] === target) return mid; else if (arr[mid] < target) left = mid + 1; else right = mid - 1; } return -1; }');