  // 공통 함수: 차트 생성 및 범례 동적 생성
        function createChart(canvasId, legendId, labels, data, colors) {
            const ctx = document.getElementById(canvasId).getContext('2d');
            const chart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: colors
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

            // 범례 동적 생성
            const legendContainer = document.getElementById(legendId);
            legendContainer.innerHTML = labels.map((label, index) => `
                <div style="display: flex; align-items: center; margin-bottom: 5px;">
                    <span
                        style="
                            display: inline-block;
                            background-color: ${colors[index]};
                            width: 12px;
                            height: 12px;
                            border-radius: 50%;
                            margin-right: 8px;">
                    </span>
                    <span style="margin-right: 10px; font-weight: bold;">${label}</span>
                    <button
                        style="
                            margin-left:15px;
                            font-size: 18px; /* 텍스트 크기 키우기 */
                            background: none;
                            border: none;
                            padding: 0;
                            margin: 0;
                            color: ${colors[index]};
                            text-decoration: underline;
                            cursor: pointer;"
                        onclick="onButtonClick('${label}', ${data[index]})"
                    >
                        ${data[index]}건
                    </button>
                </div>
            `).join('');

            // 차트 객체 반환
            return chart;
        }

        // 버튼 클릭 핸들러 (현재는 동작 없음)
        function onButtonClick(label, value) {
            // 클릭 시 다른 작업을 정의할 수 있음
            console.log(`${label}에서 ${value}건 클릭`);
        }

        // 부서 업무 현황 차트 생성 stageCount에 따라 값이 변함
        createChart(
            'departmentChart',
            'departmentLegend',
            ['예정', '진행지연', '진행중', '완료지연', '완료'],
            stageCounts,
            ['#FF6384', '#36A2EB', '#FFCE56', '#FFA07A', '#90EE90']
        );

        // 나의 업무 참여 현황 차트 생성
        createChart(
            'myTaskChart',
            'myTaskLegend',
            ['예정', '진행지연', '진행중', '완료지연', '완료'],
            [1, 2, 1, 1, 1],
            ['#FF6384', '#36A2EB', '#FFCE56', '#FFA07A', '#90EE90']
        );