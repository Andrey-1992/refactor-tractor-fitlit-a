import './css/base.scss';
import './css/styles.scss';

// import userData from './data/users';
// import sleepData from './data/sleep';
import hydrationData from './data/hydration';
import HydrationRepo from './hydrationRepo'
import SleepRepo from './SleepRepo.js'
import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import dayjs from 'dayjs';
import fetchCalls from './apiCalls';
import domUpdates from './domUpdates';


// import activityData from './data/activity';

// let defaultDate = new Date();
// // console.log(defaultDate)
// let currentDate = dayjs(defaultDate).format('YYYY/MM/DD');
// console.log("date here--->", currentDate)


// let user ;
// let todayDate = "2019/09/22";




///---GLOBAL VARIABLES FOR DOM ELEMENTS ---------------------------
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
let friendsStepsParagraphs = document.querySelectorAll('.friends-steps');
let hydrationDataEntry = document.querySelectorAll('.num-ounces-input');

// queries for DOM post request !
let addNumSteps = document.querySelector('.add-num-steps');
let addMinActv = document.querySelector('.add-min-actv');
let addFlightStairs = document.querySelector('.add-flight-stairs');
let submitAtcvDataBtn = document.getElementById('submitAtcvData');

mainPage.addEventListener('click', showInfo);
profileButton.addEventListener('click', showDropdown);
submitAtcvDataBtn.addEventListener('click', postActivityData);


function flipCard(cardToHide, cardToShow) {
  cardToHide.classList.add('hide');
  cardToShow.classList.remove('hide');
}



//////////////// DOM MANIPULATION ------------------------>
function showDropdown() {
  userInfoDropdown.classList.toggle('hide');
}


// switch statement
// needs a different target.
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


let userRepository = new UserRepository();
let todayDate = "2020/01/22";
let user;


function fetchData() {
  const userInfo = fetchCalls.callFitLitData('users');
  const activityInfo = fetchCalls.callFitLitData('activity');
  const hydrationInfo = fetchCalls.callFitLitData('hydration');
  const sleepInfo = fetchCalls.callFitLitData('sleep');

  Promise.all([userInfo, activityInfo, hydrationInfo, sleepInfo])
  .then(data => initializedData(data[0], data[1], data[2], data[3]))
  .catch(err => console.error(err))
}

function initializedData(userData, activityData, hydrationData, sleepData) {
  Promise.resolve(intializeUserData(userData)).then(storeUserData(activityData, hydrationData, sleepData)).then(updatePageInfo());
}

function intializeUserData(userData) {
  userData.userData.forEach(user => {
    let userInstance = new User(user);
    userRepository.users.push(userInstance)
  })
}

fetchData();

function storeUserData (activityData, hydrationData, sleepData) {
    activityData.activityData.forEach(activity => {
     new Activity(activity, userRepository);
    });
    hydrationData.hydrationData.forEach(hydration => {
      new Hydration(hydration, userRepository);
    });
    sleepData.sleepData.forEach(sleep => {
      new Sleep(sleep, userRepository);
    });
  }


  function updatePageInfo() {

    user = userRepository.users[0];

    activityInformation(user, userRepository);
    hydrationInformation(user, userRepository)
    sleepInformation(user, userRepository);
    userInformation(user);
  }

function activityInformation(user, userRepository) {
  const minActTodayInfo = user.findActivityInfoToday(user, todayDate).minutesActive;
  domUpdates.displayDomData(stepsInfoActiveMinutesToday, minActTodayInfo)

  const stepsTodayInfo = user.findActivityInfoToday(user, todayDate).steps;
  domUpdates.displayDomData(stepsUserStepsToday, stepsTodayInfo);

  const milesWalkedTodayInfo = user.findActivityInfoToday(user, todayDate).calculateMiles(userRepository);
  domUpdates.displayDomData(stepsInfoMilesWalkedToday, milesWalkedTodayInfo);

  const flightsOfStairsTodayInfo = user.findActivityInfoToday(user, todayDate).flightsOfStairs;
  domUpdates.displayDomData(stairsInfoFlightsToday, flightsOfStairsTodayInfo);

  const stairsTodayInfo = user.findActivityInfoToday(user, todayDate).flightsOfStairs * 12;
  domUpdates.displayDomData(stairsUserStairsToday, stairsTodayInfo);

  const actvAvgWeekInfo = user.calculateActivityAverageThisWeek('minutesActive', todayDate);
  domUpdates.displayDomData(stepsCalendarTotalActiveMinutesWeekly, actvAvgWeekInfo);

  const totalStepsThisWeekInfo = user.calculateActivityAverageThisWeek('steps', todayDate);
  domUpdates.displayDomData(stepsCalendarTotalStepsWeekly, totalStepsThisWeekInfo);

  const flightOfStairsAvgWeekInfo = user.calculateActivityAverageThisWeek('flightsOfStairs', todayDate);
  domUpdates.displayDomData(stairsCalendarFlightsAverageWeekly, flightOfStairsAvgWeekInfo);

  const stairsAvgWeekInfo = (user.calculateActivityAverageThisWeek('flightsOfStairs', todayDate) * 12).toFixed(0);
  domUpdates.displayDomData(stairsCalendarStairsAverageWeekly, stairsAvgWeekInfo);

  const friendsAvgMinutesToday = userRepository.calculateAverages(user, 'minutesActive');
  domUpdates.displayDomData(stepsFriendActiveMinutesAverageToday, friendsAvgMinutesToday);

  const friendsAvgStepsToday = userRepository.calculateAverages(user, 'steps');
  domUpdates.displayDomData(stepsFriendStepsAverageToday, friendsAvgStepsToday);

  const friendsTotalStepsToday = userRepository.calculateAverageStepGoal();
  domUpdates.displayDomData(stepsFriendAverageStepGoal, friendsTotalStepsToday);

  const friendsAvgStairsToday = (userRepository.calculateAverages(user, 'flightsOfStairs') / 12).toFixed(1);
  domUpdates.displayDomData(stairsFriendFlightsAverageToday, friendsAvgStairsToday);

  user.findFriendsTotalStepsForWeek(userRepository.users, todayDate);

  user.friendsActivityRecords.forEach(friend => {

    dropdownFriendsStepsContainer.innerHTML += `
    <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.totalWeeklySteps}</p>
    `;
  });

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
  });
}

function userInformation(user) {
  const userUpperCaseName = user.name.toUpperCase();
  domUpdates.displayDomData(dropdownName, userUpperCaseName);

  const userGoalCard = `DAILY STEP GOAL | ${user.dailyStepGoal}`;
  domUpdates.displayDomData(dropdownGoal, userGoalCard);

  const userEmailCard = `EMAIL | ${user.email}`;
  domUpdates.displayDomData(dropdownEmail, userEmailCard);

  const userFirstName = `${user.getFirstName()}'S `;
  domUpdates.displayDomData(headerName, userFirstName);
}

document.getElementById('sleep-card-container').addEventListener('submit', (e) => {
  if (e.target.classList.contains("sleep-submit")) {
    addSleep(e);
  }
});

function addSleep(e) {
  // e.preventDefault();
  console.log("I am here")
  let defaultDate = new Date();
  let currentDate = dayjs(defaultDate).format('YYYY/MM/DD');
  const formData = new FormData(e.target);
  todayDate = currentDate;
  const sleepItem = {
    userID: user.id,
    date: currentDate,
    hoursSlept: formData.get('hoursSlept'),
    sleepQuality: formData.get('sleepQuality')
  }
  fetchCalls.postNewData('sleep', sleepItem);
  fetchData();
  e.target.reset();
}


function postActivityData(e) {
  e.preventDefault();
  let defaultDate = new Date();
  let currentDate = dayjs(defaultDate).format('YYYY/MM/DD');
  todayDate = currentDate;
  const numStepsInput = parseInt(addNumSteps.value);
  const minActiveInput = parseInt(addMinActv.value);
  const flightStairsInput = parseInt(addFlightStairs.value);

  let postObject = {
    userID: user.id,
    date: todayDate,
    numSteps: numStepsInput,
    minutesActive: minActiveInput,
    flightsOfStairs: flightStairsInput
  };
  fetchCalls.postNewData('activity', postObject);
  fetchData();
}









function hydrationInformation(user, userRepository) {
  let sortedHydrationDataByDate = user.ouncesRecord.sort((a, b) => {
    if (Object.keys(a)[0] > Object.keys(b)[0]) {
      return -1;
    }
    if (Object.keys(a)[0] < Object.keys(b)[0]) {
      return 1;
    }
    return 0;
  });
for (var i = 0; i < dailyOz.length; i++) {
  dailyOz[i].innerText = user.addDailyOunces(Object.keys(sortedHydrationDataByDate[i])[0])
}

hydrationUserOuncesToday.innerText = user.getOuncesByDate(todayDate);
console.log("hello");


hydrationFriendOuncesToday.innerText = userRepository.calculateAverageDailyWater(todayDate);

hydrationInfoGlassesToday.innerText = userRepository.calculateAverageDailyWater(todayDate)/8;

// }
// function hydrationInformation(user, userRepository) {
// for (var i = 0; i < dailyOz.length; i++) {
//   dailyOz[i].innerText = user.addDailyOunces(Object.keys(sortedHydrationDataByDate[i])[0])
// }

// hydrationUserOuncesToday.innerText = user.getOuncesByDate(todayDate);
// // Old Code
// // hydrationUserOuncesToday.innerText = hydrationData.find(hydration => {
// //   return hydration.userID === user.id && hydration.date === todayDate;
// // }).numOunces;

// hydrationFriendOuncesToday.innerText = userRepository.calculateAverageDailyWater(todayDate);

// //user class
// hydrationInfoGlassesToday.innerText = hydrationData.find(hydration => {
//   return hydration.userID === user.id && hydration.date === todayDate;
// }).numOunces / 8;

// //--------------------------------------------------------------------------
// ///ERROR: scripts.js:179 ReferenceError: Cannot access 'sortedHydrationDataByDate' before initialization
//   let sortedHydrationDataByDate = user.ouncesRecord.sort((a, b) => {
//     if (Object.keys(a)[0] > Object.keys(b)[0]) {
//       return -1;
//     }
//     if (Object.keys(a)[0] < Object.keys(b)[0]) {
//       return 1;
//     }
//     return 0;
//   });

}


//DOM ELEMENTS THAT ARE UPDATED PART 2 THAT NEED USER instantiated first!!***...
///THESE FOR NOW NEED TO STAY HERE  -------------------

// stairsTrendingButton.addEventListener('click', updateTrendingStairsDays());
// stepsTrendingButton.addEventListener('click', updateTrendingStepDays());




function sleepInformation(user, userRepository) {

sleepCalendarHoursAverageWeekly.innerText = user.calculateAverageHoursThisWeek(todayDate);

sleepCalendarQualityAverageWeekly.innerText = user.calculateAverageQualityThisWeek(todayDate);

// sleepFriendLongestSleeper.innerText = userRepository.users.find(user => {
//   return user.id === userRepository.getLongestSleepers(todayDate)
// }).getFirstName();
//
// sleepFriendWorstSleeper.innerText = userRepository.users.find(user => {
//   return user.id === userRepository.getWorstSleepers(todayDate)
// }).getFirstName();

sleepInfoHoursAverageAlltime.innerText = user.hoursSleptAverage;

sleepInfoQualityAverageAlltime.innerText = user.sleepQualityAverage;

sleepInfoQualityToday.innerText = user.getSleepQualityByDate(todayDate);

sleepUserHoursToday.innerText = user.getHoursSleptByDate(todayDate);

}



function updateTrendingStairsDays() {
  user.findTrendingStairsDays();
  let trendingStairs = user.trendingStairsDays[0];
  domUpdates.updateTrendingDates(trendingStairsPhraseContainer, trendingStairs);
}

function updateTrendingStepDays() {
  user.findTrendingStepDays();
  let trendingSteps = user.trendingStepDays[0];
  domUpdates.updateTrendingDates(trendingStepsPhraseContainer, trendingSteps);
}

stairsTrendingButton.addEventListener('click', function () {
  user.findTrendingStairsDays();
  let trendingStairsDays = user.user.trendingStairsDays[0];
  domUpdates.updateTrendingDates(trendingStairsPhraseContainer, trendingStairsDays);
});

stepsTrendingButton.addEventListener('click', function () {
  user.findTrendingStepDays();
  let trendingStepsDays = user.trendingStepDays[0];
  domUpdates.updateTrendingDates(trendingStepsPhraseContainer, trendingStepsDays);
});
