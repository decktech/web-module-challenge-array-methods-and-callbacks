const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note. 

💡 HINT: You may want to filter the data first 😉*/
const finalsYear2014 = fifaData.filter((match) => {
    return match.Year === 2014 && match.Stage === 'Final'
})
//console.log(finalsYear2014)
//(a) Home Team name for 2014 world cup final
//console.log(finalsYear2014[0]['Home Team Name']);
// //(b) Away Team name for 2014 world cup final
// console.log(finalsYear2014[0]['Away Team Name']);
// //(c) Home Team goals for 2014 world cup final
// console.log(finalsYear2014[0]['Home Team Goals'])
// //(d) Away Team goals for 2014 world cup final
// console.log(finalsYear2014[0]['Away Team Goals']);
// //(e) Winner of 2014 world cup final */
// console.log(finalsYear2014[0]['Win conditions']);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive an array as a parameter that will take the fifa data as its argument
2. Return an array of objects with the data of the teams that made it to the final stage

💡 HINT - you should be looking at the stage key inside of the objects
*/

function getFinals(arr) {
    const allFinals = arr.filter((match) => {
        return match.Stage === 'Final';
    })
    return allFinals;
}
//console.log(getFinals(fifaData))


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(arr, cb) {
    return cb(arr).map(match => match.Year);
}
//console.log(getYears(fifaData, getFinals))




/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Determines the winner (home or away) of each `finals` game. 
💡 HINT: Don't worry about ties for now (Please see the README file for info on ties for a stretch goal.)
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(arr, cb) {
    return cb(arr).map((match) =>
        match['Home Team Goals'] > match['Away Team Goals'] ? match['Home Team Name'] : match['Away Team Name']);
}
//console.log(getWinners(fifaData, getFinals))


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Receive a callback function as the third parameter that will take getYears from task 3 as an argument
4. Receive a callback function as the fourth parameter that will take getWinners from task 4 as an argument
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

💡 HINT: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(arr, cbGetFinals, cbGetYears, cbGetWinners) {
    const winners = cbGetWinners(arr, cbGetFinals);
    const years = cbGetYears(arr, cbGetFinals);
    return winners.map((item, index) => `In ${years[index]}, ${item} won the world cup!`)
}
//console.log(getWinnersByYear(fifaData, getFinals, getYears, getWinners))


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive a callback function in a parameter that will take getFinals (from task 2) as an argument and ensure you pass in the fifaData as its argument
 
 💡 HINT: Example of invocation: getAverageGoals(getFinals(fifaData));

 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 💡 HINT: use .reduce, .toFixed (refer to MDN for syntax), and do this in 2 steps) 
 
 
*/
const newCB = getFinals(fifaData)

function getAverageGoals(cb) {
    let homeTeamGoalTotal = cb.map(item => item['Home Team Goals']).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    let awayTeamGoalTotal = cb.map(item => item['Away Team Goals']).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    let avgTotalGoal = (homeTeamGoalTotal + awayTeamGoalTotal) / cb.length;
    return avgTotalGoal.toFixed(2);
 }

//console.log(newCB)
//console.log(getAverageGoals(newCB));
//console.log(newCB.map(item => item['Home Team Goals']))
/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {
    const winningInitials = [];
    for (let i = 0; i < data.length; i++) {
    if(data[i]['Home Team Goals'] > data[i]['Away Team Goals']) {
        winningInitials.push(data[i]['Home Team Initials']);
    } else if (data[i]['Home Team Goals'] < data[i]['Away Team Goals']) {
        winningInitials.push(data[i]['Away Team Initials']);
    }
}
const totalWins = winningInitials.filter(team => team === teamInitials);
const totalWinsNumber = totalWins.length;
return totalWinsNumber;
}

//console.log(getCountryWins(newCB, 'ITA'))
// let testArr = ['GER', 'GER', 'GER', 'ITL', 'GER']
// let test = testArr.filter(team => team === 'GER')
// console.log(test)
// console.log(test.reduce((previousValue, currentValue) => previousValue + currentValue,
// 'GER'
// ))


/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) { 
    const newArr = [];
    for (let i = 0; i < data.length; i++) {
        if(data[i]['Home Team Goals'] > 0 || data[i]['Home Team Goals'] > 0) {
            newArr.push([`${data[i][`Home Team Name`]}`, data[i]['Home Team Goals']]);
            newArr.push([`${data[i][`Away Team Name`]}`, data[i]['Away Team Goals']])
        }  
    }
    const totalGoalsObj = Object.fromEntries(newArr);
    Object.keys(totalGoalsObj).forEach(value => {
        totalGoalsObj[value] = 0;
    })
    for (let i = 0; i < newArr.length; i++) {
        totalGoalsObj[`${newArr[i][0]}`] += newArr[i][1];
    }
    const totalGamesObj = Object.fromEntries(newArr);
    Object.keys(totalGoalsObj).forEach(value => {
        totalGoalsObj[value] = 0;
    })
    for (let i = 0; i < newArr.length; i++) {
        totalGamesObj[`${newArr[i][0]}`] += 1;
    }
    const finalObj = {};
    
    console.log(data.length)
    return totalGamesObj;
}

console.log(getGoals(newCB))
//console.log(newCB)
/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
