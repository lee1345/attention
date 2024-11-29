<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="ko">
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
        <a href="editProfile.jsp">정보수정</a> <!-- jsp명 임의지정 -->
        <a href="logout.jsp">로그아웃</a> <!-- jsp명 임의지정 -->
        <%
        } else {
        %>
        <a href="login.jsp">로그인</a> <!-- jsp명 임의지정 -->
        <a href="signup.jsp">회원가입</a> <!-- jsp명 임의지정 -->
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
                    <li><a href="teamTasks.jsp">- 팀별 할일</a></li> <!-- jsp명 임의지정 -->
                    <li><a href="myTasks.jsp">- 나의 할일</a></li> <!-- jsp명 임의지정 -->
                </ul>
            </li>
            <li><a href="schedule.jsp">일정관리</a></li> <!-- jsp명 임의지정 -->
            <li>
                <span>게시판</span>
                <ul>
                    <li><a href="notices.jsp">- 공지사항</a></li> <!-- jsp명 임의지정 -->
                    <li><a href="freeBoard.jsp">- 자유게시판</a></li> <!-- jsp명 임의지정 -->
                </ul>
            </li>
            <li><a href="addressBook.jsp">주소록</a></li> <!-- jsp명 임의지정 -->
        </ul>
    </nav>
</div>
</body>
</html>
