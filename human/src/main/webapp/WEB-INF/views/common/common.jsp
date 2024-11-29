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
<link rel="stylesheet" href="/css/common.css">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ATTENTION</title>
    <link rel="stylesheet" href="common.css">
</head>
<body>
    <header>
        <div class="logo">ATTENTION</div>
        <div class="user-info">
            <%
                // 로그인 여부 확인: session에서 사용자 정보를 가져옴
                String userName = (String) session.getAttribute("userName");
                String userTeam = (String) session.getAttribute("userTeam");
                if (userName != null && userTeam != null) {
            %>
                <span><%= userTeam %></span> <!-- 로그인 후 부서 표시 -->
                <strong><%= userName %></strong> <!-- 로그인 후 이름 표시 -->
                <a href="editProfile.jsp">정보수정</a>
                <a href="logout.jsp">로그아웃</a>
            <%
                } else {
            %>
                <div id="login" onclick="location.href='login.jsp'">로그인</div> // 임의 지정
                <div id="signup" onclick="location.href='signup.jsp'">회원가입</div> // 임의 지정
            <%
                }
            %>
        </div>
    </header>
    <div class="container">
        <nav class="sidebar">
            <ul>
                <li>
                    <span>할일관리</span>
                    <ul>
                        <li onclick="location.href='teamTasks.jsp'">- 팀별 할일</li> // 임의 지정
                        <li onclick="location.href='myTasks.jsp'">- 나의 할일</li> // 임의 지정
                    </ul>
                </li>
                <li>
                    <ul>
                        <li>
                            <strong onclick="location.href='schedule.jsp'">일정관리</strong> // 임의 지정
                        </li>
                    </ul>
                </li>
                <li>
                    <span>게시판</span>
                    <ul>
                        <li onclick="location.href='notices.jsp'">- 공지사항</li> // 임의 지정
                        <li onclick="location.href='freeBoard.jsp'">- 자유게시판</li> // 임의 지정
                    </ul>
                </li>
                <li>
                    <strong onclick="location.href='addressBook.jsp'">주소록</strong> // 임의 지정
                </li>
            </ul>
        </nav>
    </div>
</body>
</html>
