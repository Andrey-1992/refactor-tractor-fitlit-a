class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.address = userData.address;
    this.email = userData.email;
    this.strideLength = userData.strideLength;
    this.dailyStepGoal = userData.dailyStepGoal;
    this.totalStepsThisWeek = 0;
    this.friends = userData.friends;
    this.ouncesAverage = 0;
    this.ouncesRecord = [];
    this.hoursSleptAverage = 0;
    this.sleepQualityAverage = 0;
    this.sleepHoursRecord = [];
    this.sleepQualityRecord = [];
    this.activityRecord = [];
    this.accomplishedDays = [];
    this.trendingStepDays = [];
    this.trendingStairsDays = [];
    this.friendsNames = [];
    this.friendsActivityRecords = []
  }

  getFirstName() {
    var names = this.name.split(' ');
    return names[0].toUpperCase();
  }

  ////////////////////////  - HYDRATION METHODS - ////////////////////////
  ///REFACTOR LN 201 SCRIPTS.JS
  //THIS METHOD RETURNS the ounces of water drank on one day for one user.
  getOuncesByDate(date) {
    let valueNeeded = 0;
    this.ouncesRecord.forEach(item => {
      let key = Object.keys(item);
      let value = Object.values(item)
      if (key[0] === date) {
        valueNeeded = value;
      }
    })
    return valueNeeded;
  }

  updateHydration(date, amount) {
    this.ouncesRecord.unshift({[date]: amount});
    if (this.ouncesRecord.length) {
      this.ouncesAverage = Math.round((amount + (this.ouncesAverage * (this.ouncesRecord.length - 1))) / this.ouncesRecord.length);
    } else {
      this.ouncesAverage = amount;
    }
  }

  addDailyOunces(date) {
    console.log(this.ouncesRecord);
    return this.ouncesRecord.reduce((sum, record) => {
      let amount = record[date];
      if (amount) {
        sum += amount
      }
      return sum
    }, 0)
  }

  ////////////////////////  - SLEEP METHODS - ////////////////////////
  updateSleep(date, hours, quality) {
    this.sleepHoursRecord.unshift({
      'date': date,
      'hours': hours
    });
    this.sleepQualityRecord.unshift({
      'date': date,
      'quality': quality
    });
    this.hoursSleptAverage = ((hours + (this.hoursSleptAverage * (this.sleepHoursRecord.length - 1))) / this.sleepHoursRecord.length).toFixed(1);
    this.sleepQualityAverage = ((quality + (this.sleepQualityAverage * (this.sleepQualityRecord.length - 1))) / this.sleepQualityRecord.length).toFixed(1);

  }

  calculateAverageHoursThisWeek(todayDate) {
     if(!todayDate){
      todayDate = this.sleepQualityRecord[0].date;
    }
  return (this.sleepHoursRecord.reduce((sum, sleepAct) => {
    let index = this.sleepHoursRecord.indexOf(this.sleepHoursRecord.find(sleep => sleep.date === todayDate));
    if (index <= this.sleepHoursRecord.indexOf(sleepAct) && this.sleepHoursRecord.indexOf(sleepAct) <= (index + 6)) {
      sum += sleepAct.hours;
    }
    return sum;
  }, 0) / 7).toFixed(1);
  }

  calculateAverageQualityThisWeek(todayDate) {
     if(!todayDate){
      todayDate = this.sleepQualityRecord[0].date;
    }
    return (this.sleepQualityRecord.reduce((sum, sleepAct) => {
      let index = this.sleepQualityRecord.indexOf(this.sleepQualityRecord.find(sleep => sleep.date === todayDate));
      if (index <= this.sleepQualityRecord.indexOf(sleepAct) && this.sleepQualityRecord.indexOf(sleepAct) <= (index + 6)) {
        sum += sleepAct.quality;
      }
      return sum;
    }, 0) / 7).toFixed(1);
  }

  getSleepQualityByDate(date) {
      if(!date){
      date = this.sleepQualityRecord[0].date;
    }
    let valueNeeded = 0;
    this.sleepQualityRecord.forEach(item => {
      if (item.date === date)  {
        valueNeeded = item.quality;
      }
    })
    return valueNeeded;
  }

  getHoursSleptByDate(date) {
      if(!date){
      date = this.sleepQualityRecord[0].date;
    }
    let valueNeeded = 0;

    this.sleepHoursRecord.forEach(item => {
      if (item.date === date)  {
        valueNeeded = item.hours;
      }
    })
    return valueNeeded;
  }






  ////////////////////////  - ACTIVITY MEHTODS - ////////////////////////
  // update activity data to corresponding user instances ------>
  updateActivities(activity) {
    this.activityRecord.unshift(activity);
    if (activity.numSteps >= this.dailyStepGoal) {
      this.accomplishedDays.unshift(activity.date);
    }
  }

  //This method is recyclable and help us for all the activity info for today
  findActivityInfoToday(user) {
    let todayDate = this.activityRecord[0].date;

    return this.activityRecord.find(activity =>
      activity.userId === user.id && activity.date === todayDate);
  }

  // calculate average "minutes", "steps", "flightsOfStairs" this WEEK -->
  calculateActivityAverageThisWeek(activityType) {
    let todayDate = this.activityRecord[0].date;
    // console.log(todayDate);
    // console.log(this.activityRecord)

    return (this.activityRecord.reduce((sum, activity) => {
      let index = this.activityRecord.indexOf(this.activityRecord.find(activity => activity.date === todayDate));
      if (index <= this.activityRecord.indexOf(activity) && this.activityRecord.indexOf(activity) <= (index + 6)) {
        sum += activity[activityType];
      }
      return sum;
    }, 0) / 7).toFixed(0);
  }

  // calculate daily calores -------> EXTRA INFO <----------------
  calculateDailyCalories(date) {
    //    if(!todayDate){
    //   todayDate = this.activityRecord[0].date);
    // }
    let totalMinutes = this.activityRecord.filter(activity => {
      return activity.date === date
    }).reduce((sumMinutes, activity) => {
      return sumMinutes += activity.minutesActive
    }, 0);
    return Math.round(totalMinutes * 7.6);
  }

  // Where are we using this method ? ------------->
  findTrendingStepDays() {
    let positiveDays = [];
    for (var i = 0; i < this.activityRecord.length; i++) {
      if (this.activityRecord[i + 1] && this.activityRecord[i].steps > this.activityRecord[i + 1].steps) {
        positiveDays.unshift(this.activityRecord[i].date);
      } else if (positiveDays.length > 2) {
        this.trendingStepDays.push(`Your most recent positive step streak was ${positiveDays[0]} - ${positiveDays[positiveDays.length - 1]}!`);
        positiveDays = [];
      }
    }
  }

  // Where are we using this method ? ------------->
  findTrendingStairsDays() {
    let positiveDays = [];
    for (var i = 0; i < this.activityRecord.length; i++) {
      if (this.activityRecord[i + 1] && this.activityRecord[i].flightsOfStairs > this.activityRecord[i + 1].flightsOfStairs) {
        positiveDays.unshift(this.activityRecord[i].date);
      } else if (positiveDays.length > 2) {
        this.trendingStairsDays.push(`Your most recent positive climbing streak was ${positiveDays[0]} - ${positiveDays[positiveDays.length - 1]}!`);
        positiveDays = [];
      }
    }
  }

  // Extra Method: (extension) --------->
  findFriendsNames(users) {
    this.friends.forEach(friend => {
      this.friendsNames.push(users.find(user => user.id === friend).getFirstName());
    })
  }

  calculateTotalStepsThisWeek(todayDate) {
    // let todayDate = this.activityRecord[0].date;
    // console.log(this.totalStepsThisWeek)

    this.totalStepsThisWeek = (this.activityRecord.reduce((sum, activity) => {
      let index = this.activityRecord.indexOf(this.activityRecord.find(activity => activity.date === todayDate));
      if (index <= this.activityRecord.indexOf(activity) && this.activityRecord.indexOf(activity) <= (index + 6)) {
        sum += activity.steps;
      }
      return sum;
    }, 0));
  }

  // Extra Method: (extension) --------->
  findFriendsTotalStepsForWeek(users, date) {
      // if(!date){
    //   this.sleepQualityAverage[0].date;
    // }
    this.friends.map(friend => {
      let matchedFriend = users.find(user => user.id === friend);
      matchedFriend.calculateTotalStepsThisWeek(date);
      this.friendsActivityRecords.push(
        {
          'id': matchedFriend.id,
          'firstName': matchedFriend.name.toUpperCase().split(' ')[0],
          'totalWeeklySteps': matchedFriend.totalStepsThisWeek
        })
    })
    this.calculateTotalStepsThisWeek(date);
      // if(!date){
    //   this.sleepQualityAverage[0].date;
    // }
    this.friendsActivityRecords.push({
      'id': this.id,
      'firstName': 'YOU',
      'totalWeeklySteps': this.totalStepsThisWeek
    });
    this.friendsActivityRecords = this.friendsActivityRecords.sort((a, b) => b.totalWeeklySteps - a.totalWeeklySteps);
  }

  // Extra Method: (extension) --------->
  findClimbingRecord() {

    return this.activityRecord.sort((a, b) => {
      return b.flightsOfStairs - a.flightsOfStairs;
    })[0].flightsOfStairs;
  }
}

export default User;
