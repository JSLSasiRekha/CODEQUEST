const sampleProblems = [
    {
      title: 'Two Sum',
      slug: 'two-sum',
      description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table'],
      companies: ['Google', 'Amazon', 'Facebook'],
      solution: 'function twoSum(nums, target) { /* solution code */ }',
      testCases: [
        {
          input: '[2, 7, 11, 15], 9',
          output: '[0, 1]',
          explanation: 'The numbers at indices 0 and 1 add up to 9.'
        },
        {
          input: '[3, 2, 4], 6',
          output: '[1, 2]',
          explanation: 'The numbers at indices 1 and 2 add up to 6.'
        }
      ],
      constraints: '1 <= nums.length <= 10^4, -10^9 <= nums[i] <= 10^9'
    },
    {
      title: 'Reverse Integer',
      slug: 'reverse-integer',
      description: 'Reverse digits of an integer.',
      difficulty: 'Easy',
      tags: ['Math'],
      companies: ['Microsoft', 'Apple'],
      solution: 'function reverseInteger(x) { /* solution code */ }',
      testCases: [
        {
          input: '123',
          output: '321',
          explanation: 'The reversed integer of 123 is 321.'
        },
        {
          input: '-123',
          output: '-321',
          explanation: 'The reversed integer of -123 is -321.'
        }
      ],
      constraints: '-2^31 <= x <= 2^31 - 1'
    },
    {
      title: 'Palindrome Number',
      slug: 'palindrome-number',
      description: 'Determine whether an integer is a palindrome.',
      difficulty: 'Easy',
      tags: ['Math'],
      companies: ['Uber', 'Netflix'],
      solution: 'function isPalindrome(x) { /* solution code */ }',
      testCases: [
        {
          input: '121',
          output: 'true',
          explanation: '121 is a palindrome because it reads the same backward as forward.'
        },
        {
          input: '-121',
          output: 'false',
          explanation: '-121 is not a palindrome because it does not read the same backward as forward.'
        }
      ],
      constraints: '-2^31 <= x <= 2^31 - 1'
    },
    {
      title: 'Valid Parentheses',
      slug: 'valid-parentheses',
      description: 'Given a string containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
      difficulty: 'Easy',
      tags: ['Stack'],
      companies: ['LinkedIn', 'Adobe'],
      solution: 'function isValid(s) { /* solution code */ }',
      testCases: [
        {
          input: '"()"',
          output: 'true',
          explanation: 'The string "()" is a valid parentheses sequence.'
        },
        {
          input: '"()[]{}"',
          output: 'true',
          explanation: 'The string "()[]{}" is a valid parentheses sequence.'
        }
      ],
      constraints: '1 <= s.length <= 10^4, s consists of parentheses only \'(){}[]\'.'
    },
    {
      title: 'Merge Two Sorted Lists',
      slug: 'merge-two-sorted-lists',
      description: 'Merge two sorted linked lists and return it as a new sorted list.',
      difficulty: 'Easy',
      tags: ['Linked List'],
      companies: ['Twitter', 'Square'],
      solution: 'function mergeTwoLists(l1, l2) { /* solution code */ }',
      testCases: [
        {
          input: '1->2->4, 1->3->4',
          output: '1->1->2->3->4->4',
          explanation: 'Merging [1,2,4] and [1,3,4] results in [1,1,2,3,4,4].'
        }
      ],
      constraints: 'Both l1 and l2 are sorted in non-decreasing order.'
    },
    {
      title: 'Maximum Subarray',
      slug: 'maximum-subarray',
      description: 'Find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
      difficulty: 'Easy',
      tags: ['Array', 'Dynamic Programming'],
      companies: ['Oracle', 'Intel'],
      solution: 'function maxSubArray(nums) { /* solution code */ }',
      testCases: [
        {
          input: '[-2,1,-3,4,-1,2,1,-5,4]',
          output: '6',
          explanation: 'The contiguous subarray [4,-1,2,1] has the largest sum = 6.'
        }
      ],
      constraints: '1 <= nums.length <= 2 * 10^4, -10^5 <= nums[i] <= 10^5'
    },
    {
      title: 'Container With Most Water',
      slug: 'container-with-most-water',
      description: 'Given n non-negative integers representing vertical lines at positions x where the width of each bar is 1, compute the maximum amount of water that can be trapped after raining.',
      difficulty: 'Medium',
      tags: ['Array', 'Two Pointers'],
      companies: ['Tesla', 'IBM'],
      solution: 'function maxArea(height) { /* solution code */ }',
      testCases: [
        {
          input: '[1,8,6,2,5,4,8,3,7]',
          output: '49',
          explanation: 'The maximum area of water (trapped between [8,6,2,5,4,8,3,7]) = 49 square units.'
        }
      ],
      constraints: 'n >= 2, 1 <= height[i] <= 10^5'
    },
    {
      title: '3Sum',
      slug: '3sum',
      description: 'Given an array nums of n integers, find all unique triplets in the array which gives the sum of zero.',
      difficulty: 'Medium',
      tags: ['Array', 'Two Pointers'],
      companies: ['Airbnb', 'Spotify'],
      solution: 'function threeSum(nums) { /* solution code */ }',
      testCases: [
        {
          input: '[-1,0,1,2,-1,-4]',
          output: '[[-1,-1,2],[-1,0,1]]',
          explanation: 'Unique triplets [-1,-1,2] and [-1,0,1] sum up to zero.'
        }
      ],
      constraints: '0 <= nums.length <= 3000, -10^5 <= nums[i] <= 10^5'
    },
    {
      title: 'Longest Substring Without Repeating Characters',
      slug: 'longest-substring-without-repeating-characters',
      description: 'Given a string s, find the length of the longest substring without repeating characters.',
      difficulty: 'Medium',
      tags: ['String', 'Sliding Window'],
      companies: ['Facebook', 'Uber'],
      solution: 'function lengthOfLongestSubstring(s) { /* solution code */ }',
      testCases: [
        {
          input: '"abcabcbb"',
          output: '3',
          explanation: 'The longest substring without repeating characters is "abc", which has a length of 3.'
        }
      ],
      constraints: '0 <= s.length <= 5 * 10^4, s consists of English letters, digits, symbols and spaces.'
    },
    {
      title: 'Merge Intervals',
      slug: 'merge-intervals',
      description: 'Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.',
      difficulty: 'Medium',
      tags: ['Array', 'Sorting'],
      companies: ['Amazon', 'Google'],
      solution: 'function merge(intervals) { /* solution code */ }',
      testCases: [
        {
          input: '[[1,3],[2,6],[8,10],[15,18]]',
          output: '[[1,6],[8,10],[15,18]]',
          explanation: 'Merging intervals [[1,3],[2,6],[8,10],[15,18]] results in [[1,6],[8,10],[15,18]].'
        }
      ],
      constraints: '1 <= intervals.length <= 10^4, intervals[i].length == 2'
    },
]
  