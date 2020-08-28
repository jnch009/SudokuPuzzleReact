## Sudoku Puzzle in React

#### This is my first attempt at creating an app in React. Utilizing several resources from reactjs.org to help understand how to utilize components, props and state to accomplish the task at hand. The basic idea of a Sudoku is as follows:

1. Only one number from 1-9 is allowed on each row
2. Only one number from 1-9 is allowed on each column
3. Only one number from 1-9 is allowed in each grid

*The goal of the game is to find the missing numbers in the grid such that all three of these conditions are satisfied and if they are then you have successfully completed the puzzle. If not, then you must backtrack and find out which numbers are inserted incorrectly.*


**UPDATED (05-22-2020)**

*Instead of the grid being populated through a brute force algorithm, a new backtracking algorithm is used! Link to the source here: https://www.youtube.com/watch?v=G_UYXzGuqvM
I modified a little bit of the algorithm in the video by writing a helper function that checks if the filled sudoku grid is a valid solution then break out instead of having the recursive algorithm check for every single solution (since I am using this algorithm with an empty grid, it will take a very long time to find every single solution). 
Another thing I had done is instead of always setting the order of the array as [1,2,3....9], I utilized the fisher yates algorithm to shuffle these 9 numbers such that we would hopefully get a different ordering each time from the solve function. The shuffle function could perhaps generate 9! different possibilities (9 choices for the first index, then 8, then 7, etc....).*


**UPDATED (08-27-2020)**

Auth0 authentication will be added very soon.

**As a warning, DO NOT HIT the back button after logging in to go back to the login screen. You will be met with an Auth0 error that will determine that you are using the system incorrectly.**

I have updated the login box for Auth0 to use the newer lightweight version. It has fixed a few of my troubling/extremely frustrating issues with react-router and preventing back button presses (which did not work). It has notably fixed the bug where a user could hit the back button and relogin again with the system not throwing any errors.

###### Now built on Netlify: https://competent-aryabhata-ab481d.netlify.app
