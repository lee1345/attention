document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.getElementById("calendar");
    const popup = document.getElementById("popup");
    const closePopup = document.getElementById("close-popup");
    const prevMonth = document.getElementById("prev-month");
    const nextMonth = document.getElementById("next-month");
    const currentMonth = document.getElementById("current-month");
    const monthlyView = document.getElementById("monthly-view");
    const weeklyView = document.getElementById("weekly-view");
    const dailyView = document.getElementById("daily-view");

    const individualRadio = document.getElementById("individual-view");
    const teamRadio = document.getElementById("team-view");
    const allRadio = document.getElementById("all-view");

    let today = new Date();
    let currentYear = today.getFullYear();
    let currentMonthIndex = today.getMonth();

    // Sample events with type "T" for team and "M" for individual
    const events = [
        {
            date: "2024-11-20",
            title: "[토스] 홈페이지 외주",
            priority: "중요",
            status: "진행",
            time: "2024.11.20 (수) 09:00 ~ 2024.11.22 (금) 18:00",
            manager: "김혜민",
            participants: "김혜민, 이태웅, 전지훈",
            details: "김혜민 -> DB설계, 이태웅 -> 회원가입 담당, 전지훈 -> 상세메뉴 담당",
            type: "T" // Team event
        },
        {
            date: "2024-11-22",
            title: "[개인] 디자인 수정",
            priority: "보통",
            status: "완료",
            time: "2024.11.22 (금) 15:00 ~ 2024.11.22 (금) 17:00",
            manager: "이태웅",
            participants: "이태웅",
            details: "디자인 수정 작업",
            type: "M" // Individual event
        },
        {
            date: "2024-11-24",
            title: "[팀] 회의",
            priority: "중요",
            status: "진행",
            time: "2024.11.24 (일) 10:00 ~ 2024.11.24 (일) 12:00",
            manager: "전지훈",
            participants: "전지훈, 김혜민",
            details: "팀 회의 진행",
            type: "T" // Team event
        }
    ];

    function updateCalendar(year, monthIndex) {
        calendar.innerHTML = "";
        currentMonth.textContent = `${year}.${String(monthIndex + 1).padStart(2, "0")}`;

        const firstDay = new Date(year, monthIndex, 1);
        const lastDay = new Date(year, monthIndex + 1, 0);

        for (let i = 0; i < firstDay.getDay(); i++) {
            calendar.appendChild(document.createElement("div"));
        }

        for (let i = 1; i <= lastDay.getDate(); i++) {
            const day = document.createElement("div");
            day.textContent = i;

            const dateStr = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
            const filteredEvents = events.filter((e) => e.date === dateStr);

            if (filteredEvents.length > 0) {
                filteredEvents.forEach(event => {
                    const eventElem = document.createElement("div");
                    eventElem.textContent = event.title;
                    eventElem.classList.add("event");
                    eventElem.dataset.event = JSON.stringify(event);

                    if (event.type === "T") {
                        eventElem.classList.add("team-event"); // Green color for team events
                    } else {
                        eventElem.classList.add("individual-event"); // Default color for individual events
                    }
                    day.appendChild(eventElem);
                });
            }

            calendar.appendChild(day);
        }
    }

    function showPopup(event) {
        document.getElementById("popup-title").textContent = event.title;
        document.getElementById("popup-priority").textContent = event.priority;
        document.getElementById("popup-status").textContent = event.status;
        document.getElementById("popup-date").textContent = event.time;
        document.getElementById("popup-manager").textContent = event.manager;
        document.getElementById("popup-participants").textContent = event.participants;
        document.getElementById("popup-details").textContent = event.details;

        popup.classList.remove("hidden");
    }

    function handleViewChange(view) {
        if (view === "weekly") {
            const startDay = new Date(currentYear, currentMonthIndex, today.getDate() - today.getDay());
            calendar.innerHTML = "";

            for (let i = 0; i < 7; i++) {
                const day = new Date(startDay);
                day.setDate(startDay.getDate() + i);

                const dayElem = document.createElement("div");
                dayElem.textContent = day.getDate();

                const dateStr = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
                const event = events.find((e) => e.date === dateStr);

                if (event) {
                    dayElem.classList.add("event");
                    dayElem.dataset.event = JSON.stringify(event);
                }

                calendar.appendChild(dayElem);
            }
        } else if (view === "daily") {
            calendar.innerHTML = "";
            const day = document.createElement("div");
            day.textContent = today.getDate();

            const dateStr = `${currentYear}-${String(currentMonthIndex + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
            const event = events.find((e) => e.date === dateStr);

            if (event) {
                day.classList.add("event");
                day.dataset.event = JSON.stringify(event);
            }

            calendar.appendChild(day);
        } else {
            updateCalendar(currentYear, currentMonthIndex);
        }
    }

    prevMonth.addEventListener("click", () => {
        currentMonthIndex--;
        if (currentMonthIndex < 0) {
            currentMonthIndex = 11;
            currentYear--;
        }
        updateCalendar(currentYear, currentMonthIndex);
    });

    nextMonth.addEventListener("click", () => {
        currentMonthIndex++;
        if (currentMonthIndex > 11) {
            currentMonthIndex = 0;
            currentYear++;
        }
        updateCalendar(currentYear, currentMonthIndex);
    });

    calendar.addEventListener("click", (e) => {
        if (e.target.classList.contains("event")) {
            const event = JSON.parse(e.target.dataset.event);
            showPopup(event);
        }
    });

    closePopup.addEventListener("click", () => {
        popup.classList.add("hidden");
    });

    monthlyView.addEventListener("click", () => handleViewChange("monthly"));
    weeklyView.addEventListener("click", () => handleViewChange("weekly"));
    dailyView.addEventListener("click", () => handleViewChange("daily"));

    individualRadio.addEventListener("change", () => filterEvents("M"));
    teamRadio.addEventListener("change", () => filterEvents("T"));
    allRadio.addEventListener("change", () => filterEvents("all"));

    function filterEvents(type) {
        if (type === "M") {
            updateCalendar(currentYear, currentMonthIndex);
        } else if (type === "T") {
            updateCalendar(currentYear, currentMonthIndex);
        } else {
            updateCalendar(currentYear, currentMonthIndex);
        }
    }

    updateCalendar(currentYear, currentMonthIndex);
});
