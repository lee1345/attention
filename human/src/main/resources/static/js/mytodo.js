// 공통 함수: 차트 생성 및 범례 동적 생성
function createChart(canvasId, legendId, labels, data, colors) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error(`Canvas with id "${canvasId}" not found!`);
        return;
    }

    const ctx = canvas.getContext('2d');

    // 캔버스 크기 설정
    canvas.width = 400;  // 차트 너비
    canvas.height = 400; // 차트 높이

    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: colors,
                },
            ],
        },
        options: {
            responsive: true, // 반응형 활성화
            maintainAspectRatio: true, // 비율 유지
            plugins: {
                legend: {
                    display: false, // 기본 범례 비활성화
                },
                tooltip: {
                    enabled: true, // 툴팁 활성화
                },
            },
        },
        plugins: [
            {
                id: 'textOverlay',
                afterDraw: (chart) => {
                    const ctx = chart.ctx;
                    const dataset = chart.data.datasets[0];

                    dataset.data.forEach((value, index) => {
                        if (value === 0) return; // 값이 0이면 렌더링하지 않음

                        const meta = chart.getDatasetMeta(0).data[index];
                        const { x, y } = meta.tooltipPosition();

                        // 텍스트 스타일 설정
                        ctx.save();
                        ctx.fillStyle = "black"; // 텍스트 색상
                        ctx.font = 'bold 14px Arial'; // 텍스트 폰트
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';

                        // 텍스트 그리기
                        ctx.fillText(`${value}건`, x, y);
                        ctx.restore();
                    });
                },
            },
        ],
    });

    // 범례 동적 생성
    const legendContainer = document.getElementById(legendId);
    if (!legendContainer) {
        console.error(`Legend container with id "${legendId}" not found!`);
        return;
    }

    legendContainer.innerHTML = labels
        .map(
            (label, index) => `
            <li style="display: flex; align-items: center; margin-bottom: 5px;">
                <span style="
                    display: inline-block;
                    width: 20px
                    height: 20px;
                    background-color: ${colors[index]};
                    margin-right: 8px;
                    border-radius: 50%;"></span>
                <span style="font-size: 15px; font-weight: bold; color: #333;">
                    ${label}:
                </span>
                <button
                    style="
                        margin-left: 10px;
                        font-size: 18px; /* 텍스트 크기 키우기 */
                        background: none;
                        border: none;
                        padding: 0;
                        color: ${colors[index]};
                        text-decoration: underline;
                        cursor: pointer;"
                    onclick="onButtonClick('${label}', ${data[index]})"
                >
                    ${data[index]}건
                </button>
            </li>
        `
        )
        .join('');
}

// 버튼 클릭 핸들러 (현재는 동작 없음)
function onButtonClick(label, value) {
    console.log(`${label}에서 ${value}건 클릭`);
}

// "나의 업무 현황" 차트 생성 호출
createChart(
    'myChart', // JSP 파일의 캔버스 ID와 동일하게 수정
    'myLegend', // JSP 파일의 범례 컨테이너 ID
    ['예정', '진행지연', '진행중', '완료지연', '완료'], // 범례 라벨
    [2, 0, 1, 0, 1], // 데이터
    ['#FF6384', '#36A2EB', '#FFCE56', '#FFA07A', '#90EE90'] // 색상 배열
);
// 요소 선택
const openPopupBtn = document.getElementById('openPopup');
const closePopupBtn = document.getElementById('closePopup');
const popupOverlay = document.getElementById('popupOverlay');
const popup = document.getElementById('popup');

// 팝업 열기
openPopupBtn.addEventListener('click', () => {
    popupOverlay.style.display = 'block';
    popup.style.display = 'block';
});

// 팝업 닫기
closePopupBtn.addEventListener('click', () => {
    popupOverlay.style.display = 'none';
    popup.style.display = 'none';
});

// 팝업 외부 클릭 시 닫기
popupOverlay.addEventListener('click', () => {
    popupOverlay.style.display = 'none';
    popup.style.display = 'none';
});
