<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
    isELIgnored="false"  %>
 <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<c:set var="contextPath"  value="${pageContext.request.contextPath}"  />

<%
  request.setCharacterEncoding("UTF-8");
%>

<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ATTENTION</title>
    <link rel="stylesheet" href="/css/common.css" />
  </head>
  <body>
    <header>
      <div class="logo">ATTENTION</div>
      <div class="user-info">
        <!-- 로그인 여부에 따라 표시되는 콘텐츠 -->
        <!-- 로그인 전 -->
        <div id="login">로그인</div>
        <div id="sing">회원가입</div>

        <!-- 로그인 후 -->
        <!-- <span>인사팀</span> -->
        <!-- 부서 표시 -->
        <!-- <strong>김혜민</strong> -->
        <!-- 사용자 이름 -->
        <!-- <a href="editProfile.html">정보수정</a>
        <a href="logout.html">로그아웃</a> -->
      </div>
    </header>
    <div class="container">
      <nav class="sidebar">
        <ul>
          <li>
            <span>할일관리</span>
            <ul>
              <li>- 팀별 할일</li>
              <li>- 나의 할일</li>
            </ul>
          </li>
          <ul>
            <li>
              <strong>일정관리</strong>
            </li>
          </ul>
          <li>
            <span>게시판</span>
            <ul>
              <li>- 공지사항</li>
              <li>- 자유게시판</li>
            </ul>
          </li>
          <li>
            <strong>주소록</strong>
          </li>
        </ul>
      </nav>
    </div>
  </body>
</html>
