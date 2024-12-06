// 나의 업무 참여 현황 차트 생성
        const chartColors = ['#FF6384', '#36A2EB', '#FFCE56', '#FFA07A'];
        const chartLabels = ['예정', '진행중', '지연', '완료'];
        const chartData = [2, 1, 0, 1];

        // 범례 동적 생성
        const legendContainer = document.querySelector('.chart-legend');
        legendContainer.innerHTML = chartLabels.map((label, index) => `
            <li style="display: flex; align-items: center; font-size: 16px; margin-bottom: 8px; color: ${chartColors[index]};">
                <span style="
                    background-color: ${chartColors[index]};
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    margin-right: 8px;
                "></span>
                <span>${label}:</span>
                <button
                    style="
                        font-size: 18px; /* 텍스트 크기 키우기 */
                        background: none;
                        border: none;
                        padding: 0;
                        margin-left: 5px;
                        font-weight: bold;
                        text-decoration: underline;
                        color: ${chartColors[index]};
                        cursor: pointer;
                    "
                    onclick="onButtonClick('${label}', ${chartData[index]})"
                >
                    ${chartData[index]}건
                </button>
            </li>
        `).join('');

        // 버튼 클릭 핸들러
        function onButtonClick(label, value) {
            console.log(`${label}: ${value}건 버튼이 클릭되었습니다.`);
            // 필요한 추가 작업 정의 가능
        }

        // 캔버스 크기 고정
        const canvas = document.getElementById('myChart');
        canvas.style.width = '150px';  // 원하는 너비
        canvas.style.height = '150px'; // 원하는 높이

        // 차트 생성
        const ctx = canvas.getContext('2d');
        const chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: chartLabels,
                datasets: [{
                    data: chartData,
                    backgroundColor: chartColors,
                }]
            },
            options: {
                responsive: false, // 반응형 비활성화
                maintainAspectRatio: false, // 비율 유지 비활성화
                plugins: {
                    legend: {
                        display: false // 기본 범례 비활성화
                    },
                    tooltip: {
                        enabled: false // 툴팁 비활성화
                    }

                }
            },
            plugins: [{
                id: 'textOverlay',
                afterDraw: (chart) => {
                    const ctx = chart.ctx;
                    const dataset = chart.data.datasets[0];

                    dataset.data.forEach((value, index) => {
                        if (value === 0) return; // 건수가 0이면 렌더링하지 않음

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
                }
            }]
        });