document.addEventListener("DOMContentLoaded", () => {
    const modal = document.querySelector("#task-popup"); // 수정 모달
    const overlay = document.querySelector(".modal-overlay"); // 오버레이
    const modalHeader = modal.querySelector("h2"); // 모달 제목
    const actionButton = modal.querySelector("button:last-of-type"); // 수정/추가 버튼
    let isEditMode = false; // 등록/수정 모드 구분 플래그
    let currentRow = null; // 수정 중인 행 참조

    // 수정 버튼 클릭 이벤트
    document.querySelectorAll(".edit").forEach((button) => {
        button.addEventListener("click", (event) => {
            isEditMode = true; // 수정 모드 활성화
            currentRow = event.target.closest("tr"); // 현재 클릭된 행
            const todoData = {
                id: currentRow.dataset.id,
                title: currentRow.cells[4].textContent.trim(),
                priority: currentRow.cells[1].textContent.trim(),
                stage: currentRow.cells[2].textContent.trim(),
                startDate: currentRow.cells[5].textContent.trim(),
                endDate: currentRow.cells[6].textContent.trim(),
                content: currentRow.cells[3].textContent.trim(),
            };

            // 모달에 데이터 채우기
            modal.querySelector("#title").value = todoData.title;
            modal.querySelector("#priority").value = todoData.priority;
            modal.querySelector("#stage").value = todoData.stage;
            modal.querySelector("#start-date").value = todoData.startDate;
            modal.querySelector("#end-date").value = todoData.endDate;
            modal.querySelector("#content").value = todoData.content;

            // 모달 제목 및 버튼 텍스트 변경
            modalHeader.textContent = "TEAM 업무 수정하기";
            actionButton.textContent = "수정완료";

            // 모달 열기
            modal.style.display = "block";
            overlay.style.display = "block";
        });
    });

    // 추가 버튼 클릭 이벤트
    document.querySelector(".btn-open-register-modal").addEventListener("click", () => {
        isEditMode = false; // 등록 모드 활성화
        resetModal(); // 모달 초기화

        // 모달 제목 및 버튼 텍스트 변경
        modalHeader.textContent = "TEAM 업무 등록하기";
        actionButton.textContent = "추가하기";

        // 모달 열기
        modal.style.display = "block";
        overlay.style.display = "block";
    });

    // 등록/수정 버튼 클릭 이벤트
    actionButton.onclick = () => {
        const requestData = {
            title: modal.querySelector("#title").value.trim(),
            priority: modal.querySelector("#priority").value,
            stage: modal.querySelector("#stage").value,
            startDate: modal.querySelector("#start-date").value,
            endDate: modal.querySelector("#end-date").value,
            content: modal.querySelector("#content").value.trim(),
        };

        if (!requestData.title) {
            alert("제목을 입력하세요!");
            return;
        }

        if (isEditMode) {
            // 수정 요청
            requestData.id = currentRow.dataset.id;
            sendPostRequest(`/api/todo/update/${requestData.id}`, requestData)
                .then((response) => {
                    if (response.status === "success") {
                        updateTableRow(currentRow, requestData); // 테이블 업데이트
                        modal.style.display = "none";
                        overlay.style.display = "none";
                    } else {
                        alert("수정 실패! 다시 시도해주세요.");
                    }
                })
                .catch((error) => {
                    console.error("수정 실패:", error);
                    alert("수정 중 문제가 발생했습니다.");
                });
        } else {
            // 등록 요청
            sendPostRequest("/api/todo/create", requestData)
                .then((response) => {
                    if (response.status === "success") {
                        alert("등록 성공!");
                        location.reload(); // 새로고침
                    } else {
                        alert("등록 실패! 다시 시도해주세요.");
                    }
                })
                .catch((error) => {
                    console.error("등록 실패:", error);
                    alert("등록 중 문제가 발생했습니다.");
                });
        }
    };

    // 테이블 업데이트 함수
    function updateTableRow(row, updatedData) {
        row.cells[1].textContent = updatedData.priority;
        row.cells[2].textContent = updatedData.stage;
        row.cells[3].textContent = updatedData.content;
        row.cells[4].textContent = updatedData.title;
        row.cells[5].textContent = updatedData.startDate || "-";
        row.cells[6].textContent = updatedData.endDate || "-";
    }

    // 모달 닫기 버튼 이벤트
    document.querySelectorAll(".btn-modal-close").forEach((button) => {
        button.addEventListener("click", () => {
            resetModal(); // 모달 초기화
            modal.style.display = "none";
            overlay.style.display = "none";
        });
    });

    // 모달 초기화 함수
    function resetModal() {
        modal.querySelectorAll("input, textarea, select").forEach((input) => {
            if (input.type === "text" || input.tagName === "TEXTAREA") {
                input.value = "";
            } else if (input.type === "date") {
                input.value = null;
            } else if (input.tagName === "SELECT") {
                input.selectedIndex = 0;
            }
        });

        // 모달 제목 및 버튼 텍스트 초기화
        modalHeader.textContent = "TEAM 업무 등록하기";
        actionButton.textContent = "추가하기";
    }

    // 서버 요청 함수
    function sendPostRequest(url, data) {
        return fetch(url, {
            method: isEditMode ? "PUT" : "POST", // 수정/등록에 따라 HTTP 메서드 변경
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .catch((error) => {
                console.error("Request failed:", error);
                throw error;
            });
    }
});
