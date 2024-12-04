// 경로 설정:
const navigationLinks = {
  login: "/login", // 로그인 경로
  signup: "/signup", // 회원가입 경로
  teamTasks: "/teamTasks", // 팀별 할일 경로
  myTasks: "/myTasks", // 나의 할일 경로
  schedule: "/schedule", // 일정관리 경로
  notice: "/notice", // 공지사항 경로
  freeBoard: "/freeBoard", // 자유게시판 경로
  address: "/address", // 주소록 경로
};

// 링크 설정 함수
function setupNavigation() {
  // navigationLinks 객체의 각 항목을 순회하면서 동적으로 href 설정
  Object.keys(navigationLinks).forEach((key) => {
    const linkElement = document.getElementById(key); // 해당 id를 가진 요소 찾기
    if (linkElement) {
      linkElement.href = navigationLinks[key];
    }
  });
}

// DOM이 로드된 후 링크 설정
document.addEventListener("DOMContentLoaded", setupNavigation);
