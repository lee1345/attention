<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LOGIN</title>
  <link rel="stylesheet" href="${contextPath}/css/login.css">
  <script src="https://code.jquery.com/jquery-3.4.1.js" ></script>

</head>
<body>
  <div class="container">
    <!-- 왼쪽 이미지 영역 -->
    <div class="image-section">
      <img src="${contextPath}/images/banner.PNG" style="width:650px;">
    </div>

    <!-- 오른쪽 로그인 기능 영역 -->
    <div class="form-section">
      <!-- 로그인 -->
      <div class="login-container" id="login-page">
        <h1>LOGIN</h1>
        <form id="login-form">
          <label for="login_id">ID</label>
          <input type="text" id="login_id" name="login_id" placeholder="ID를 입력하세요" required>

          <label for="login_pw">Password</label>
          <input type="password" id="login_pw" name="login_pw" placeholder="비밀번호를 입력하세요" required>
          <br><br>
          <button type="submit" id="btn_login">LOGIN</button>
          <div class="links">
            <a id="signup-link">회원가입</a>
            <a id="forgot-link">아이디/비밀번호 찾기</a>
          </div>
        </form>
      </div>

      <!-- 개인정보 모달창 -->
      <div id="privacy-modal" class="modal">
        <div class="modal-content">
          <h2>개인정보 활용 동의</h2>
          <br>
          <p>회원님의 개인정보는 서비스 제공 및 계정 관리를 위해 사용되며, 동의 없이 외부에 제공되지 않습니다.</p>
          <br>
          <button class="close-btn">확인</button>
        </div>
      </div>

      <!-- 회원가입 -->
      <div class="login-container" id="signup-page" style="display: none;">
        <h1>SIGN IN</h1>
        <form id="signup-form">
          <label for="e_id">ID</label>
          <input type="text" id="e_id" name="e_id" placeholder="아이디를 입력하세요" maxlength="16" required>
          <div class="warning" id="idWarning"></div>
          <button class="idCehck" id="idCheck" onclick="fn_idCheck()">아이디 중복 확인</button>

          <label for="e_pwd">PASSWORD</label>
          <input type="password" id="e_pwd" name="e_pwd" placeholder="비밀번호를 입력하세요" minlength="8" maxlength="16" required>

          <label for="pw_confirm">PASSWORD CONFIRM</label>
          <input type="password" id="pw_confirm" name="pw_confirm" placeholder="비밀번호 확인" required>
          <div class="warning" id="pwdWarning"></div>
          <div id="pwdStatus"></div>

          <label for="e_name">이름</label>
          <input type="text" id="e_name" name="e_name" placeholder="이름을 입력하세요" maxlength="16" required>
          <div class="warning" id="nameWarning"></div>

          <label for="e_dept">부서</label>
            <select id="e_dept" name="e_dept" required>
              <option value="">부서를 선택하세요</option>
              <option value="M">경영</option>
              <option value="H">인사총무</option>
              <option value="F">재무회계</option>
              <option value="S">영업마케팅</option>
            </select>

          <label for="e_position">직위</label>
            <select id="e_position" name="e_position" required>
              <option value="">직위를 선택하세요</option>
              <option value="C">대표</option>
              <option value="SM">수석</option>
              <option value="M">책임</option>
              <option value="SA">선임</option>
              <option value="JA">사원</option>
            </select>

          <label for="e_phone">전화번호</label>
          <input type="tel" id="e_phone" name="e_phone" placeholder="전화번호를 입력하세요" required>

          <label for="e_email">이메일</label>
          <input type="email" id="e_email" name="e_email" placeholder="이메일을 입력하세요" required>

          <div class="checkbox-container">
            <input type="checkbox" style="width:40px" id="agree" name="agree" required>
            <label for="agree">개인정보활용동의</label>
          </div>

          <button type="button" id="btn_submit">회원가입</button>
        </form>
      </div>

      <!-- 아이디 찾기 -->
         <div class="login-container" id="forgot-page" style="display: none;">
             <h1>아이디 찾기</h1>
             <form id="find-id-form" onsubmit="findId(event); return false;">
                 <label for="input_name">이름</label>
                 <input type="text" id="input_name" name="e_name" placeholder="이름을 입력하세요" required>
                 <label for="input_email">이메일</label>
                 <input type="email" id="input_email" name="e_email" placeholder="이메일을 입력하세요" required>
                 <button type="submit">아이디 찾기</button>
                 <div class="links" style="text-align: center;">
                     <a id="forgot-pw-link">비밀번호 찾기</a>
                 </div>
             </form>
         </div>

              <!-- 비밀번호 초기화 -->
         <div class="login-container" id="forgot-pw-page" style="display: none;">
             <h1>비밀번호 초기화</h1>
             <form id="reset-password-form" onsubmit="resetPassword(event); return false;">
                 <label for="reset_id">아이디</label>
                 <input type="text" id="reset_id" name="e_id" placeholder="아이디를 입력하세요" required>
                 <label for="reset_email">이메일</label>
                 <input type="email" id="reset_email" name="e_email" placeholder="이메일을 입력하세요" required>
                 <button type="submit">비밀번호 초기화</button>
             </form>
             <div class="links" style="text-align: center;">
             </div>
         </div>


    </div>
  </div>

  <script src="${contextPath}/js/login.js"></script>
</body>
</html>
