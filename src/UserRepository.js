

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
    let todaysDrinkers = this.users.filter(user => {
      return user.addDailyOunces(date) > 0;
    });
    let sumDrankOnDate = todaysDrinkers.reduce((sum, drinker) => {
      return sum += drinker.addDailyOunces(date);
    }, 0)
    return Math.floor(sumDrankOnDate / todaysDrinkers.length);
  }

  findBestSleepers(date) {
    return this.users.filter(user => {
      return user.calculateAverageQualityThisWeek(date) > 3;
    })
  }

  getLongestSleepers(date) {
    const usersByDate = [];
    this.users.forEach(user => {
      usersByDate.push({hoursSlept: user.getHoursSleptByDate(date), name: user.name});
    })
    return  usersByDate.sort((a, b) => a.hoursSlept - b.hoursSlept).pop().name;
  }

  getWorstSleepers(date) {
    const usersByDate = [];
    this.users.forEach(user => {
      usersByDate.push({hoursSlept: user.getHoursSleptByDate(date), name: user.name});
    })
    return  usersByDate.sort((a, b) => a.hoursSlept - b.hoursSlept).shift().name;
  }

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
