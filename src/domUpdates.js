
const domUpdates = {

  displayDomData(todayActDomSection, actInfoData) {
    todayActDomSection.innerText = '';
    todayActDomSection.innerText = actInfoData;
  },

  displayDomFriendsData(dropdownFriendsStepsContainer, friendName, friendSteps) {
    dropdownFriendsStepsContainer.innerHTML = '';
    dropdownFriendsStepsContainer.innerHTML =
    `
    <p class='dropdown-p friends-steps'>${friendName} |  ${friendSteps}</p>
    `
  },

  updateTrendingDates(trendingStepsPhraseContainer, activityDaysInfo) {
    trendingStepsPhraseContainer.innerHTML = '';
    trendingStepsPhraseContainer.innerHTML =
    `
    <p class='trend-line'>${activityDaysInfo}</p>
    `
  },
}

export default  domUpdates;
