import './css/base.scss';
import './css/styles.scss';

import {domUpdate, showDropDown, showInfo, submitAtcvDataBtn,stairsTrendingButton,
stepsTrendingButton, stepsInfoActiveMinutesToday, stepsUserStepsToday, userInformation, stepsInfoMilesWalkedToday } from './domUpdates';

// import userData from './data/users';
// import sleepData from './data/sleep';
import hydrationData from './data/hydration';
import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import dayjs from 'dayjs';



domUpdate();


submitAtcvDataBtn.addEventListener('click', postActivityData);

// import activityData from './data/activity';
import fetchCalls from './apiCalls';

// let defaultDate = new Date();
// // console.log(defaultDate)
// let currentDate = dayjs(defaultDate).format('YYYY/MM/DD');
// console.log("date here--->", currentDate)


// let user ;
// let todayDate = "2019/09/22";

// mainPage.addEventListener('click', showInfo);
// profileButton.addEventListener('click', showDropdown);
// submitAtcvDataBtn.addEventListener('click', postActivityData);

document.getElementById('js-add-sleep').addEventListener('submit', (e) => {
  addSleep(e);
})


function preventDefault() {
  event.preventDefault()
}


function flipCard(cardToHide, cardToShow) {
  cardToHide.classList.add('hide');
  cardToShow.classList.remove('hide');
}



//this holds all our users...* this is an important global variable right now.
let userRepository = new UserRepository();

//REFACTOR:NEW CHANGE: this date is not accurate



// let defaultDate = new Date();
// // console.log(defaultDate)
// let currentDate = dayjs(defaultDate).format('YYYY/MM/DD');
// console.log("date here--->", currentDate)

let todayDate = '2020/01/19';


// default date--- last date in the array
// on a post

// 2019/09/22
//2020/01/19
let user;
  // date should be last date in list.
  // get rid of this global variable and add an argument to each method in user class that requires date
   // // if(!date){
    //   this.sleepQualityAverage[0].date;
    // }
//see calculateAverageHoursThisWeek(todayDate) as an example.



////////////////// FETCH CALL ------------------------------------->
// window.addEventListener("load", fetchData);

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
  // starts a promise chain so that you can use .then.
  Promise.resolve(intializeUserData(userData)).then(storeUserData(activityData, hydrationData, sleepData)).then(updatePageInfo());
}

//STEP 1:
function intializeUserData(userData) {
  userData.userData.forEach(user => {
    let userInstance = new User(user);
    userRepository.users.push(userInstance)
  })
}

fetchData();
////////////////// FETCH CALLS -------------------------------->


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
    sleepInformation(user, userRepository);
    userInformation(user);
    //NEED to FIX hydration function here// this is why it currently does not show up on the page.. there is no function that calls it.
    // hydrationInformation(user, userRepository);
  }



  /////////// CREATE A NEW ACTIVITY POST REQUEST ------------------>

  function postActivityData() {
    // preventDefault(); ---> Is not longer nesseasry because I wanit to update !
    // todayDate = currentDate;

  let defaultDate = new Date();
  let currentDate = dayjs(defaultDate).format('YYYY/MM/DD');

  const numStepsInput = parseInt(addNumSteps.value);

  const minActiveInput = parseInt(addMinActv.value);

  const flightStairsInput = parseInt(addFlightStairs.value);

  let user = userRepository.users[1];

  let postObject = {
     userID: user.id,
     date: currentDate,
     numSteps: numStepsInput,
     minutesActive: minActiveInput,
     flightsOfStairs: flightStairsInput
    };
  console.log('postObject', postObject)

  fetchCalls.postNewData('activity', postObject);
  fetchData();
  }

  //------------------------------------------------------------->




function addSleep(e) {
  e.preventDefault();
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

//PROBLEM// REFACTOR 
/// BECAUSE OF THE GLOBAL DATE VARIABLE PROBLEM THIS HAS TO STAY IN SCRIPTS FOR NOW
function sleepInformation(user, userRepository) {

  sleepCalendarHoursAverageWeekly.innerText = user.calculateAverageHoursThisWeek(todayDate);

  sleepCalendarQualityAverageWeekly.innerText = user.calculateAverageQualityThisWeek(todayDate);

  // sleepFriendLongestSleeper.innerText = userRepository.users.find(user => {
  //   return user.id === userRepository.getLongestSleepers(todayDate)
  // }).getFirstName();

  // sleepFriendWorstSleeper.innerText = userRepository.users.find(user => {
  //   return user.id === userRepository.getWorstSleepers(todayDate)
  // }).getFirstName();

  sleepInfoHoursAverageAlltime.innerText = user.hoursSleptAverage;

  sleepInfoQualityAverageAlltime.innerText = user.sleepQualityAverage;

  sleepInfoQualityToday.innerText = user.getSleepQualityByDate(todayDate);

  sleepUserHoursToday.innerText = user.getHoursSleptByDate(todayDate);
}

///// This function will work when we implement the fetch calls for the - Iteration 5 || Activity class Info --------------------------------------->
function activityInformation(user, userRepository) {

  ///////// ACTIVITIES FOR TODAY ---------------->
  stepsInfoActiveMinutesToday.innerText = user.findActivityInfoToday(user).minutesActive;

  stepsUserStepsToday.innerText = user.findActivityInfoToday(user).steps;

  stepsInfoMilesWalkedToday.innerText = user.findActivityInfoToday(user).calculateMiles(userRepository);

  stairsInfoFlightsToday.innerText = user.findActivityInfoToday(user).flightsOfStairs;

  stairsUserStairsToday.innerText = user.findActivityInfoToday(user).flightsOfStairs * 12;



  ///////// ACTIVITIES FOR WEEK -------------------->
  stepsCalendarTotalActiveMinutesWeekly.innerText = user.calculateActivityAverageThisWeek('minutesActive')
  // console.log(user.calculateActivityAverageThisWeek('minutesActive'))


  stepsCalendarTotalStepsWeekly.innerText = user.calculateActivityAverageThisWeek('steps');

  stairsCalendarFlightsAverageWeekly.innerText = user.calculateActivityAverageThisWeek('flightsOfStairs');

  stairsCalendarStairsAverageWeekly.innerText =
  (user.calculateActivityAverageThisWeek('flightsOfStairs') * 12).toFixed(0);



  ///////// ACTIVITIES AVERAGES -------------->
  stepsFriendStepsAverageToday.innerText = userRepository.calculateAverages(user, 'steps');

  stepsFriendActiveMinutesAverageToday.innerText =
  userRepository.calculateAverages(user, 'minutesActive');
 // userRepository.calculateAverageMinutesActive();

  stairsFriendFlightsAverageToday.innerText =
  (userRepository.calculateAverages(user, 'flightsOfStairs') / 12).toFixed(1);
  // (userRepository.calculateAverageStairs() / 12).toFixed(1);

  // Steps Goal from all friends:
  stepsFriendAverageStepGoal.innerText = `${userRepository.calculateAverageStepGoal()}`;

  // Where are we using this function ????
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
  //////----------------------------------------------------------------->






///PUT ALL OF THIS IN A FUNCTION TO CALL IN DISPLAY INFO AFTER API CALL MADE.
///TO DO: ... Move INTO USER CLASSS AND WRAP HYDRATION INFORMATION FUNCTION AROUND IT TO MATCH OTHERS. ----------------------------------------------------

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

// }


//DOM ELEMENTS THAT ARE UPDATED PART 2 THAT NEED USER instantiated first!!***...
///THESE FOR NOW NEED TO STAY HERE  -------------------

// stairsTrendingButton.addEventListener('click', updateTrendingStairsDays());
// stepsTrendingButton.addEventListener('click', updateTrendingStepDays());




////////////// SLEPT FUNCTIONALITY ------------------------->
// function sleepInformation(user, userRepository) {


  
//   sleepCalendarHoursAverageWeekly.innerText = user.calculateAverageHoursThisWeek(todayDate);

// sleepCalendarQualityAverageWeekly.innerText = user.calculateAverageQualityThisWeek(todayDate);

// // sleepFriendLongestSleeper.innerText = userRepository.users.find(user => {
// //   return user.id === userRepository.getLongestSleepers(todayDate)
// // }).getFirstName();

// // sleepFriendWorstSleeper.innerText = userRepository.users.find(user => {
// //   return user.id === userRepository.getWorstSleepers(todayDate)
// // }).getFirstName();

// sleepInfoHoursAverageAlltime.innerText = user.hoursSleptAverage;

// sleepInfoQualityAverageAlltime.innerText = user.sleepQualityAverage;

// sleepInfoQualityToday.innerText = user.getSleepQualityByDate(todayDate);

// sleepUserHoursToday.innerText = user.getHoursSleptByDate(todayDate);



// }










//DOM ELEMENTS THAT ARE UPDATED PART 2 THAT NEED USER instantiated first!!***...
///THESE FOR NOW NEED TO STAY HERE  -------------------

// stairsTrendingButton.addEventListener('click', updateTrendingStairsDays());
// stepsTrendingButton.addEventListener('click', updateTrendingStepDays());


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
