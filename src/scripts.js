import './css/base.scss';
import './css/styles.scss';

import userData from './data/users';
import activityData from './data/activity';
import sleepData from './data/sleep';
import hydrationData from './data/hydration';
import HydrationRepo from './hydrationRepo'
import SleepRepo from './SleepRepo.js'
import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';



let userRepository = new UserRepository();

userData.forEach(user => {
  user = new User(user);
  userRepository.users.push(user)
});

activityData.forEach(activity => {
  activity = new Activity(activity, userRepository);
});

hydrationData.forEach(hydration => {
  hydration = new Hydration(hydration, userRepository);
});

sleepData.forEach(sleep => {
  sleep = new Sleep(sleep, userRepository);
});

let user = userRepository.users[0];
let todayDate = "2019/09/22";
user.findFriendsNames(userRepository.users);


let dailyOz = document.querySelectorAll('.daily-oz');
let dropdownEmail = document.querySelector('#dropdown-email');
let dropdownFriendsStepsContainer = document.querySelector('#dropdown-friends-steps-container');
let dropdownGoal = document.querySelector('#dropdown-goal');
let dropdownName = document.querySelector('#dropdown-name');
let headerName = document.querySelector('#header-name');
let hydrationCalendarCard = document.querySelector('#hydration-calendar-card');
let hydrationFriendOuncesToday = document.querySelector('#hydration-friend-ounces-today');
let hydrationFriendsCard = document.querySelector('#hydration-friends-card');
let hydrationInfoCard = document.querySelector('#hydration-info-card');
let hydrationInfoGlassesToday = document.querySelector('#hydration-info-glasses-today');
let hydrationMainCard = document.querySelector('#hydration-main-card');
let hydrationUserOuncesToday = document.querySelector('#hydration-user-ounces-today');
let mainPage = document.querySelector('main');
let profileButton = document.querySelector('#profile-button');
let sleepCalendarCard = document.querySelector('#sleep-calendar-card');
let sleepCalendarHoursAverageWeekly = document.querySelector('#sleep-calendar-hours-average-weekly');
let sleepCalendarQualityAverageWeekly = document.querySelector('#sleep-calendar-quality-average-weekly');
let sleepFriendLongestSleeper = document.querySelector('#sleep-friend-longest-sleeper');
let sleepFriendsCard = document.querySelector('#sleep-friends-card');
let sleepFriendWorstSleeper = document.querySelector('#sleep-friend-worst-sleeper');
let sleepInfoCard = document.querySelector('#sleep-info-card');
let sleepInfoHoursAverageAlltime = document.querySelector('#sleep-info-hours-average-alltime');
let sleepInfoQualityAverageAlltime = document.querySelector('#sleep-info-quality-average-alltime');
let sleepInfoQualityToday = document.querySelector('#sleep-info-quality-today');
let sleepMainCard = document.querySelector('#sleep-main-card');
let sleepUserHoursToday = document.querySelector('#sleep-user-hours-today');
//This should be a method on the user class and a property on that class also.*
let sortedHydrationDataByDate = user.ouncesRecord.sort((a, b) => {
  if (Object.keys(a)[0] > Object.keys(b)[0]) {
    return -1;
  }
  if (Object.keys(a)[0] < Object.keys(b)[0]) {
    return 1;
  }
  return 0;
});
let stairsCalendarCard = document.querySelector('#stairs-calendar-card');
let stairsCalendarFlightsAverageWeekly = document.querySelector('#stairs-calendar-flights-average-weekly');
let stairsCalendarStairsAverageWeekly = document.querySelector('#stairs-calendar-stairs-average-weekly');
let stepsMainCard = document.querySelector('#steps-main-card');
let stepsInfoCard = document.querySelector('#steps-info-card');
let stepsFriendsCard = document.querySelector('#steps-friends-card');
let stepsTrendingCard = document.querySelector('#steps-trending-card');
let stepsCalendarCard = document.querySelector('#steps-calendar-card');
let stairsFriendFlightsAverageToday = document.querySelector('#stairs-friend-flights-average-today');
let stairsFriendsCard = document.querySelector('#stairs-friends-card');
let stairsInfoCard = document.querySelector('#stairs-info-card');
let stairsInfoFlightsToday = document.querySelector('#stairs-info-flights-today');
let stairsMainCard = document.querySelector('#stairs-main-card');
let stairsTrendingButton = document.querySelector('.stairs-trending-button');
let stairsTrendingCard = document.querySelector('#stairs-trending-card');
let stairsUserStairsToday = document.querySelector('#stairs-user-stairs-today');
let stepsCalendarTotalActiveMinutesWeekly = document.querySelector('#steps-calendar-total-active-minutes-weekly');
let stepsCalendarTotalStepsWeekly = document.querySelector('#steps-calendar-total-steps-weekly');
let stepsFriendAverageStepGoal = document.querySelector('#steps-friend-average-step-goal');
let stepsInfoActiveMinutesToday = document.querySelector('#steps-info-active-minutes-today');
let stepsInfoMilesWalkedToday = document.querySelector('#steps-info-miles-walked-today');
let stepsFriendActiveMinutesAverageToday = document.querySelector('#steps-friend-active-minutes-average-today');
let stepsFriendStepsAverageToday = document.querySelector('#steps-friend-steps-average-today');
let stepsTrendingButton = document.querySelector('.steps-trending-button');
let stepsUserStepsToday = document.querySelector('#steps-user-steps-today');
let trendingStepsPhraseContainer = document.querySelector('.trending-steps-phrase-container');
let trendingStairsPhraseContainer = document.querySelector('.trending-stairs-phrase-container');
let userInfoDropdown = document.querySelector('#user-info-dropdown');

mainPage.addEventListener('click', showInfo);
profileButton.addEventListener('click', showDropdown);
stairsTrendingButton.addEventListener('click', updateTrendingStairsDays());
stepsTrendingButton.addEventListener('click', updateTrendingStepDays());

function flipCard(cardToHide, cardToShow) {
  cardToHide.classList.add('hide');
  cardToShow.classList.remove('hide');
}

function showDropdown() {
  userInfoDropdown.classList.toggle('hide');
}

function showInfo() {
  if (event.target.classList.contains('steps-info-button')) {
    flipCard(stepsMainCard, stepsInfoCard);
  }
  if (event.target.classList.contains('steps-friends-button')) {
    flipCard(stepsMainCard, stepsFriendsCard);
  }
  if (event.target.classList.contains('steps-trending-button')) {
    flipCard(stepsMainCard, stepsTrendingCard);
  }
  if (event.target.classList.contains('steps-calendar-button')) {
    flipCard(stepsMainCard, stepsCalendarCard);
  }
  if (event.target.classList.contains('hydration-info-button')) {
    flipCard(hydrationMainCard, hydrationInfoCard);
  }
  if (event.target.classList.contains('hydration-friends-button')) {
    flipCard(hydrationMainCard, hydrationFriendsCard);
  }
  if (event.target.classList.contains('hydration-calendar-button')) {
    flipCard(hydrationMainCard, hydrationCalendarCard);
  }
  if (event.target.classList.contains('stairs-info-button')) {
    flipCard(stairsMainCard, stairsInfoCard);
  }
  if (event.target.classList.contains('stairs-friends-button')) {
    flipCard(stairsMainCard, stairsFriendsCard);
  }
  if (event.target.classList.contains('stairs-trending-button')) {
    flipCard(stairsMainCard, stairsTrendingCard);
  }
  if (event.target.classList.contains('stairs-calendar-button')) {
    flipCard(stairsMainCard, stairsCalendarCard);
  }
  if (event.target.classList.contains('sleep-info-button')) {
    flipCard(sleepMainCard, sleepInfoCard);
  }
  if (event.target.classList.contains('sleep-friends-button')) {
    flipCard(sleepMainCard, sleepFriendsCard);
  }
  if (event.target.classList.contains('sleep-calendar-button')) {
    flipCard(sleepMainCard, sleepCalendarCard);
  }
  if (event.target.classList.contains('steps-go-back-button')) {
    flipCard(event.target.parentNode, stepsMainCard);
  }
  if (event.target.classList.contains('hydration-go-back-button')) {
    flipCard(event.target.parentNode, hydrationMainCard);
  }
  if (event.target.classList.contains('stairs-go-back-button')) {
    flipCard(event.target.parentNode, stairsMainCard);
  }
  if (event.target.classList.contains('sleep-go-back-button')) {
    flipCard(event.target.parentNode, sleepMainCard);
  }
}

// function updateTrendingStairsDays() {
//   user.findTrendingStairsDays();
//   trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
// }
//
// function updateTrendingStepDays() {
//   user.findTrendingStepDays();
//   trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
// }

for (var i = 0; i < dailyOz.length; i++) {
  dailyOz[i].innerText = user.addDailyOunces(Object.keys(sortedHydrationDataByDate[i])[0])
}

dropdownGoal.innerText = `DAILY STEP GOAL | ${user.dailyStepGoal}`;

dropdownEmail.innerText = `EMAIL | ${user.email}`;

dropdownName.innerText = user.name.toUpperCase();

headerName.innerText = `${user.getFirstName()}'S `;

//  Refactored Code (EXAMPLE OF HOW TO MOVE CODE TO A REPO*) ------------------
const hydrationRepo = new HydrationRepo(hydrationData);

//Attempt 3 ... On user class.
//Instead this could be a method on userClass user.getOuncesByDate()
hydrationUserOuncesToday.innerText = user.getOuncesByDate(todayDate);

//ATTEMPT 2 ... on HydroRepo class.
//hydrationUserOuncesToday.innerText = hydrationRepo.getOuncesByDate(user.id, //todayDate);


// Old Code
// hydrationUserOuncesToday.innerText = hydrationData.find(hydration => {
//   return hydration.userID === user.id && hydration.date === todayDate;
// }).numOunces;’

//--------------------------------------------------------------------------

hydrationFriendOuncesToday.innerText = userRepository.calculateAverageDailyWater(todayDate);

//HYDRO REPO
hydrationInfoGlassesToday.innerText = hydrationData.find(hydration => {
  return hydration.userID === user.id && hydration.date === todayDate;
}).numOunces / 8;

sleepCalendarHoursAverageWeekly.innerText = user.calculateAverageHoursThisWeek(todayDate);

sleepCalendarQualityAverageWeekly.innerText = user.calculateAverageQualityThisWeek(todayDate);

//user repo.
sleepFriendLongestSleeper.innerText = userRepository.users.find(user => {
  return user.id === userRepository.getLongestSleepers(todayDate)
}).getFirstName();


//user repo
sleepFriendWorstSleeper.innerText = userRepository.users.find(user => {
  return user.id === userRepository.getWorstSleepers(todayDate)
}).getFirstName();

sleepInfoHoursAverageAlltime.innerText = user.hoursSleptAverage;

// // For a user, the distance they have walked (in miles) for the latest day based on their step count - Iteration 5 -
// stepsInfoMilesWalkedToday.innerText = user.activityRecord.find(activity => {
//   return (activity.date === todayDate && activity.userId === user.id)
// }).calculateMiles(userRepository);

sleepInfoQualityAverageAlltime.innerText = user.sleepQualityAverage;

//SLEEP REPO
//REFACTOR ------------------------------------

// OLD CODE -------
sleepInfoQualityToday.innerText = sleepData.find(sleep => {
  return sleep.userID === user.id && sleep.date === todayDate;
}).sleepQuality;

////**** YOU ARE HERE */
//REFACTOR OPTION 1: PUT IN SLEEP REPO
// const sleepRepo = new SleepRepo(sleepData);
// sleepInfoQualityToday.innerText = sleepRepo.getSleepQualityByDate(user.id, todayDate);

// REFACTOR OPTION 2 // PUT IN USER
     // all this data is held in user's this.sleepQualityRecord = [];
    //Note: For this to work you have to change value from ["2019/06/15", 4.7] to ... ["2019/06/15": 4.7]
// sleepInfoQualityToday.innerText = user.getSleepQualityByDate(todayDate);
// ---------------------------------------------



//SLEEP REPO---------------------------------------
// OPTION 1: PUT THIS LOGIC ON USER CLASS
    // USER class holds: this.sleepHoursRecord = []; with objects of {date: "2019/09/22", hours: 4.2}
sleepUserHoursToday.innerText = sleepData.find(sleep => {
  return sleep.userID === user.id && sleep.date === todayDate;
}).hoursSlept;

//OPTION 2: Put on sleep repo and create new method.
//--------------------------------------------------


// stairsFriendFlightsAverageToday.innerText = (userRepository.calculateAverageStairs(todayDate) / 12).toFixed(1);

// //ACTIVITY REPO
// stairsInfoFlightsToday.innerText = activityData.find(activity => {
//   return activity.userID === user.id && activity.date === todayDate;
// }).flightsOfStairs;


// //ACTIVITY REPO // this value is coming back 0: ERROR.
// stairsUserStairsToday.innerText = activityData.find(activity => {
//   return activity.userID === user.id && activity.date === todayDate;
// }).flightsOfStairs * 12;

// const test = activityData.find(activity => {
//   return activity.userID === user.id && activity.date === todayDate;
// }).flightsOfStairs * 12;
// console.log(test)


//////////// THIS CODE IS REPEATED ///////////////////////
//  weekly view of their flight staris - Iteration 5 -
// stairsCalendarFlightsAverageWeekly.innerText = user.calculateAverageFlightsThisWeek(todayDate);

// stairsCalendarFlightsAverageWeekly.innerText = user.calculateAverageFlightsThisWeek(todayDate);
//

//  weekly view of their climbed staris - Iteration 5 -
// stairsCalendarStairsAverageWeekly.innerText = (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);

// stairsCalendarStairsAverageWeekly.innerText = (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);
/////////////////////////////////////////////////////////


// // weekly view of their minutes active - Iteration 5 -
// stepsCalendarTotalActiveMinutesWeekly.innerText = user.calculateAverageMinutesActiveThisWeek(todayDate);
//
// // weekly view of their step count - Iteration 5 -
// stepsCalendarTotalStepsWeekly.innerText = user.calculateAverageStepsThisWeek(todayDate);

// For a user, the number minutes active for the latest day - Iteration 5 -
// stepsInfoActiveMinutesToday.innerText = activityData.find(activity => {
//   return activity.userID === user.id && activity.date === todayDate;
// }).minutesActive;

// For a user, the number of steps for the latest day - Iteartion 5 -
// stepsUserStepsToday.innerText = activityData.find(activity => {
//   return activity.userID === user.id && activity.date === todayDate;
// }).numSteps;

// // For a user, the distance they have walked (in miles) for the latest day based on their step count - Iteration 5 -
// stepsInfoMilesWalkedToday.innerText = user.activityRecord.find(activity => {
//   return (activity.date === todayDate && activity.userId === user.id)
// }).calculateMiles(userRepository);

// // weekly view of their minutes active - Iteration 5 -
// stepsCalendarTotalActiveMinutesWeekly.innerText = user.calculateAverageMinutesActiveThisWeek(todayDate);

// // weekly view of their step count - Iteration 5 -
// stepsCalendarTotalStepsWeekly.innerText = user.calculateAverageStepsThisWeek(todayDate);

//////////////////////// -  ACTIVITY -  EVENT LISTENERS ////////////////////

function updateTrendingStairsDays() {
  user.findTrendingStairsDays();
  trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
}

function updateTrendingStepDays() {
  user.findTrendingStepDays();
  trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
}

stairsTrendingButton.addEventListener('click', function () {
  user.findTrendingStairsDays();
  trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
});

stepsTrendingButton.addEventListener('click', function () {
  user.findTrendingStepDays();
  trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
});
///////////////////////////////////////////////////////////////




///////////////// ACTIVITY INFO ABOUT FRIENDS /////////////////////////
stairsFriendFlightsAverageToday.innerText = (userRepository.calculateAverageStairs(todayDate) / 12).toFixed(1);

stepsFriendActiveMinutesAverageToday.innerText = userRepository.calculateAverageMinutesActive(todayDate);

stepsFriendAverageStepGoal.innerText = `${userRepository.calculateAverageStepGoal()}`;

stepsFriendStepsAverageToday.innerText = userRepository.calculateAverageSteps(todayDate);

user.findFriendsTotalStepsForWeek(userRepository.users, todayDate);

user.friendsActivityRecords.forEach(friend => {
  dropdownFriendsStepsContainer.innerHTML += `
  <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.totalWeeklySteps}</p>
  `;
});

let friendsStepsParagraphs = document.querySelectorAll('.friends-steps');

friendsStepsParagraphs.forEach(paragraph => {
  if (friendsStepsParagraphs[0] === paragraph) {
    paragraph.classList.add('green-text');
  }
  if (friendsStepsParagraphs[friendsStepsParagraphs.length - 1] === paragraph) {
    paragraph.classList.add('red-text');
  }
  if (paragraph.innerText.includes('YOU')) {
    paragraph.classList.add('yellow-text');
  }
/////////////////////////////////////////////////////////////////////




///////////////////// ITERATION 5 ////////////////////////////
// INFORMATION BASED ON LASTED DAY (activity, steps & minutes avtive)

// For a user, the number minutes active for the latest day - Iteration 5 -
// OLD CODE VERSION:
// stepsInfoActiveMinutesToday.innerText = activityData.find(activity => {
//   return activity.userID === user.id && activity.date === todayDate;
// }).minutesActive;
// NEW CODE VERSION:
stepsInfoActiveMinutesToday.innerText = user.findActivityInfoToday(user, todayDate).minutesActive;

// For a user, the number of steps for the latest day - Iteartion 5 -
// Old code version:
// stepsUserStepsToday.innerText = activityData.find(activity => {
//   return activity.userID === user.id && activity.date === todayDate;
// }).numSteps;
// NEW CODE VERSION:
stepsUserStepsToday.innerText = user.findActivityInfoToday(user, todayDate).steps;

// For a user, the distance they have walked (in miles) for the latest day based on their step count - Iteration 5 -
// Old code version:
// stepsInfoMilesWalkedToday.innerText = user.activityRecord.find(activity => {
//   return (activity.date === todayDate && activity.userId === user.id)
// }).calculateMiles(userRepository);
// NEW VERSION CODE:
stepsInfoMilesWalkedToday.innerText = user.findActivityInfoToday(user, todayDate).calculateMiles(userRepository);

//  For a user, the amount of their flighted staris  for the last day- Iteration 5 -
// Old code version:
// stairsInfoFlightsToday.innerText = activityData.find(activity => {
//   return activity.userID === user.id && activity.date === todayDate;
// }).flightsOfStairs;
// NEW CODE VERSION:
stairsInfoFlightsToday.innerText = user.findActivityInfoToday(user, todayDate).flightsOfStairs;

//  For a user, the amount of their climbed staris  for the last day- Iteration 5 -
// Old code version:
// stairsUserStairsToday.innerText = activityData.find(activity => {
//   return activity.userID === user.id && activity.date === todayDate;
// }).flightsOfStairs * 12;
// NEW CODE VERSION:
stairsUserStairsToday.innerText = user.findActivityInfoToday(user, todayDate).flightsOfStairs * 12;






// For a user, a weekly view of their step count, flights of stairs climbed, and minutes active
// weekly view of their minutes active - Iteration 5 -
stepsCalendarTotalActiveMinutesWeekly.innerText = user.calculateAverageMinutesActiveThisWeek(todayDate);

// weekly view of their step count - Iteration 5 -
stepsCalendarTotalStepsWeekly.innerText = user.calculateAverageStepsThisWeek(todayDate);

//  weekly view of their flight staris - Iteration 5 -
stairsCalendarFlightsAverageWeekly.innerText = user.calculateAverageFlightsThisWeek(todayDate);

// //  weekly view of their climbed staris - Iteration 5 -
stairsCalendarStairsAverageWeekly.innerText = (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);
///////////////////////////////////////////////////////







});
