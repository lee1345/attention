document.addEventListener("DOMContentLoaded", () => {
    const table = document.querySelector("table");
    const tableBody = table.querySelector("tbody");
    const sortButtons = document.querySelectorAll(".sort-options button");

    let isAscending = true;

    // 필드 매핑
    const fields = ["priority", "stage", "content", "startDate", "endDate"];

    // 정렬 함수
    const compareRows = (rowA, rowB, criteria) => {
        const cellA = rowA.querySelector(`[data-field="${criteria}"]`)?.textContent.trim() || "";
        const cellB = rowB.querySelector(`[data-field="${criteria}"]`)?.textContent.trim() || "";

        if (criteria === "startDate" || criteria === "endDate") {
            return isAscending ? new Date(cellA) - new Date(cellB) : new Date(cellB) - new Date(cellA);
        }
        return isAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
    };

    // 테이블 정렬 실행
    const sortTable = (criteria) => {
        const rows = Array.from(tableBody.querySelectorAll("tr"));
        rows.sort((rowA, rowB) => compareRows(rowA, rowB, criteria));

        tableBody.innerHTML = "";
        rows.forEach((row) => tableBody.appendChild(row));
        isAscending = !isAscending; // 정렬 방향 토글
    };

    // 정렬 버튼 클릭 이벤트
    sortButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const criteria = button.dataset.sort;
            sortTable(criteria);
        });
    });

    // 각 테이블 셀에 data-field 속성 추가
    document.querySelectorAll("tbody tr").forEach((row) => {
        row.querySelectorAll("td").forEach((cell, index) => {
            if (fields[index]) {
                cell.setAttribute("data-field", fields[index]); // 필드 속성 추가
            }
        });
    });

    console.log("정렬 기능 활성화됨");
});
