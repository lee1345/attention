// 회원가입 버튼 클릭 시 화면 전환
document.getElementById('signup-link').addEventListener('click', () => {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('signup-page').style.display = 'block';
  });

//개인정보 활용 동의 모달

document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("agree");
  const modal = document.getElementById("privacy-modal");
  const closeBtn = document.querySelector(".close-btn");

  // 체크박스 클릭 시 모달 표시
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      modal.style.display = "block";
    } else {
      modal.style.display = "none";
    }
  });

  // 닫기 버튼 클릭 시 모달 숨기기
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    checkbox.checked = true; // 체크박스 해제
  });

  // 모달 외부 클릭 시 모달 숨기기
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      checkbox.checked = true; // 체크박스 해제
    }
  });
});