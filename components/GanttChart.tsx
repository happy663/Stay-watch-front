import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import { useLayoutEffect, useRef } from "react";
import Layout from "../components/Layout";

const data1 = [
  {
    id: 1,
    date: "2022-4-28",
    stayTimeRooms: [
      {
        roomId: 1,
        roomName: "学生部屋",
        stayTimeUsers: [
          {
            id: 1,
            userName: "山田太郎",
            stayTimes: [
              {
                id: 1,
                startAt: "20:00",
                endAt: "22:00",
              },
            ],
          },
          {
            id: 2,
            userName: "鈴木次郎",
            stayTimes: [
              {
                id: 1,
                startAt: "20:00",
                endAt: "22:00",
              },
            ],
          },
        ],
      },
      {
        roomId: 2,
        roomName: "学生部屋",
        stayTimeUsers: [
          {
            id: 1,
            userName: "山田太郎",
            stayTimes: [
              {
                id: 1,
                startAt: "20:00",
                endAt: "22:00",
              },
            ],
          },
          {
            id: 3,
            userName: "佐藤花子",
            stayTimes: [
              {
                id: 1,
                startAt: "20:00",
                endAt: "22:00",
              },
            ],
          },
        ],
      },
    ],
  },
];

const GanttChart = () => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<am4charts.XYChart | null>(null);

  // 追加
  const chartData = [
    {
      category: "A",
      start: 1609462800000, // 2021-01-01 10:00:00
      end: 1609466400000, // 2021-01-01 11:00:00
    },
    {
      category: "B",
      start: 1609473600000, // 2021-01-01 13:00:00
      end: 1609477200000, // 2021-01-01 14:00:00
    },
    {
      category: "C",
      start: 1609473600000, // 2021-01-01 13:00:00
      end: 1609477200000, // 2021-01-01 14:00:00
    },
    {
      category: "D",
      start: 1609473600000, // 2021-01-01 13:00:00
      end: 1609477200000, // 2021-01-01 14:00:00
    },
    {
      category: "E",
      start: 1609473600000, // 2021-01-01 13:00:00
      end: 1609477200000, // 2021-01-01 14:00:00
    },
    {
      category: "F",
      start: 1609473600000, // 2021-01-01 13:00:00
      end: 1609477200000, // 2021-01-01 14:00:00
    },
    {
      category: "G",
      start: 1609473600000, // 2021-01-01 13:00:00
      end: 1609477200000, // 2021-01-01 14:00:00
    },
  ];

  useLayoutEffect(() => {
    if (divRef.current) {
      const chart = am4core.create(divRef.current, am4charts.XYChart);
      chart.height = 400;
      chart.paddingTop = 0;
      chart.paddingBottom = 0;
      chart.colors.list = [
        am4core.color("#845EC2"),
        am4core.color("#D65DB1"),
        am4core.color("#FF6F91"),
        am4core.color("#FF9671"),
        am4core.color("#FFC75F"),
        am4core.color("#F9F871"),
      ];

      chart.dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss";
      chart.data = chartData; // データの適用
      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.extraMin = 0.9;
      dateAxis.extraMax = 0.9;
      dateAxis.renderer.labels.template.location = 0.0001; // この1行を消したときの違いを確認すると何の設定なのか圧倒的にイメージしやすい
      const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());

      // 適用したデータに対してy軸として設定したフィールドを指定
      // 今回はcategory
      categoryAxis.dataFields.category = "category";
      // locationはchartのgridの位置関係を0 ~ 1で指定する
      // 試しに色々変えてみるとどこが変わるのかわかりやすい
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.inversed = true;

      const series = chart.series.push(new am4charts.ColumnSeries());
      // ガントチャートのx軸は幅を指定するので2つを指定する
      series.dataFields.openDateX = "start";
      series.dataFields.dateX = "end";
      series.dataFields.categoryY = "category";
      // // {}内でプロパティ名を書くと対応した値が利用される
      // // 改行を入れたいときは改行文字を入れる
      series.columns.template.tooltipText =
        "category: {category} \n 入室: {openDateX} \n 退室: {dateX}";
      // カーソルを当てたときにtooltipがカーソルに付いて動くようにする
      // fixedかpointerの二択でどう違うかは試してみるといい
      series.columns.template.tooltipPosition = "pointer";

      // const scrollbar = new am4charts.XYChartScrollbar();
      // chart.scrollbarX = scrollbar;
      // // 前のセクションで定義したseriesをスクロールバーのseriesにpush
      // scrollbar.series.push(series);
      // chart.cursor = new am4charts.XYCursor();
      // // 引数に与える関数が実行される
      // chart.plotContainer.events.on("doublehit", () =>
      //   dateAxis.zoom({ start: 0, end: 1 })
      // );
      chartRef.current = chart;
      return () => chart.dispose();
    }
  });

  return (
    <div>
      <div
        ref={divRef}
        style={{ height: 500, width: "100%", marginTop: "100px" }}
      />
    </div>
  );
};

export default GanttChart;
