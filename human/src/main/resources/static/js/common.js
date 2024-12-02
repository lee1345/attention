// 경로 설정 :
const navigationLinks = {
  login: `${"${contextPath}"}/login.jsp`,
  signup: `${"${contextPath}"}/signup.jsp`,
  teamTasks: `${"${contextPath}"}/teamTasks.jsp`,
  myTasks: `${"${contextPath}"}/myTasks.jsp`,
  schedule: `${"${contextPath}"}/schedule.jsp`,
  notice: `${"${contextPath}"}/notice.jsp`,
  freeBoard: `${"${contextPath}"}/freeBoard.jsp`,
  addressBook: `${"${contextPath}"}/addressBook.jsp`
};

// 링크 설정 함수
function setupNavigation() {
// 헤더 링크 설정
  document.getElementById("login").href = navigationLinks.login;
  document.getElementById("signup").href = navigationLinks.signup;

// 메뉴 링크 설정
  document.getElementById("teamTasks").href = navigationLinks.teamTasks;
  document.getElementById("myTasks").href = navigationLinks.myTasks;
  document.getElementById("schedule").href = navigationLinks.schedule;
  document.getElementById("notice").href = navigationLinks.notice;
  document.getElementById("freeBoard").href = navigationLinks.freeBoard;
  document.getElementById("addressBook").href = navigationLinks.addressBook;
}

// DOM이 로드된 후 링크 설정
document.addEventListener("DOMContentLoaded", setupNavigation);

// ======================================================================================
