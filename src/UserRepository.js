import sleepData from './data/sleep';

class UserRepository {
  constructor() {
    this.users = [];
  }


  getUser(id) {
    return this.users.find(function(user) {
      return user.id === id;
    })
  }
  calculateAverageSleepQuality() {
    let totalSleepQuality = this.users.reduce((sum, user) => {
      sum += user.sleepQualityAverage;
      return sum;
    }, 0);
    return totalSleepQuality / this.users.length;
  }
  calculateAverageDailyWater(date) {
     date = user.activityRecord[0].date;
    let todaysDrinkers = this.users.filter(user => {
      return user.addDailyOunces(date) > 0;
    });
    let sumDrankOnDate = todaysDrinkers.reduce((sum, drinker) => {
      return sum += drinker.addDailyOunces(date);
    }, 0)
    return Math.floor(sumDrankOnDate / todaysDrinkers.length);
  }
  //logic needed for all of these methods that take in a data are needed.
  // findBestSleepers(date) {
  //   console.log("this.users[0]", this.users[0])
  //    date = user.activityRecord[0].date;
  //   return this.users.filter(user => {
  //     return user.calculateAverageQualityThisWeek(date) > 3;
  //   })
  // }
  // getLongestSleepers(date) {
  //   date = user.activityRecord[0].date;
  //   return sleepData.filter(sleep => {
  //     return sleep.date === date;
  //   }).sort((a, b) => {
  //     return b.hoursSlept - a.hoursSlept;
  //   })[0].userID;
  // }
  // getWorstSleepers(date) {
  //   return sleepData.filter(sleep => {
  //     return sleep.date === date;
  //   }).sort((a, b) => {
  //     return a.hoursSlept - b.hoursSlept;
  //   })[0].userID;
  // }
  calculateAverages(user, steps) {
    let date = user.activityRecord[0].date;

    let allUsersStepsCount = this.users.map(user => {
      return user.activityRecord.filter(activity => {
        return activity.date === date;
      });
    })
    let sumOfSteps = allUsersStepsCount.reduce((stepsSum, activityCollection) => {
      activityCollection.forEach(activity => {
        stepsSum += activity[steps]
      })
      return stepsSum;
    }, 0);
    return Math.round(sumOfSteps / allUsersStepsCount.length);
  }
  // calculateAverageMinutesActive(date) {
  //   let allUsersMinutesActiveCount = this.users.map(user => {
  //     return user.activityRecord.filter(activity => {
  //       return activity.date === date;
  //     });
  //   })
  //   let sumOfMinutesActive = allUsersMinutesActiveCount.reduce((minutesActiveSum, activityCollection) => {
  //     activityCollection.forEach(activity => {
  //       minutesActiveSum += activity.minutesActive
  //     })
  //     return minutesActiveSum;
  //   }, 0);
  //   return Math.round(sumOfMinutesActive / allUsersMinutesActiveCount.length);
  // }
  // calculateAverageStairs(date) {
  //   let allUsersStairsCount = this.users.map(user => {
  //     return user.activityRecord.filter(activity => {
  //       return activity.date === date;
  //     });
  //   })
  //   let sumOfStairs = allUsersStairsCount.reduce((stairsSum, activityCollection) => {
  //     activityCollection.forEach(activity => {
  //       stairsSum += activity.flightsOfStairs
  //     })
  //     return stairsSum;
  //   }, 0);
  //   return Math.round(sumOfStairs / allUsersStairsCount.length);
  // }
  calculateAverageStepGoal() {
    let goals = this.users.map((user) => user.dailyStepGoal);
    let total = goals.reduce(function(sum, goal) {
      sum += goal;
      return sum;
    }, 0);
    return total / this.users.length;
  }
}

export default UserRepository;
