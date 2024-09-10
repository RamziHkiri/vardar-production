"use client"
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export default function RoundChart() {
		const options = {
			exportEnabled: false,
			animationEnabled: true,
			title: {
                text: "les meilleurs types des spectacles",
                fontFamily: "Arial", // Specify the font family
                fontSize: 24, // Specify the font size
                fontWeight: "bold", // Specify the font weight (e.g., "normal", "bold")
                fontColor: "#000000", // Specify the font color
    
            },
            backgroundColor: "transparent",
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: false,
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}%",
				dataPoints: [
					{ y: 32.4, label: "Comedie" },
					{ y: 17.5, label: "tragedie" },
					{ y: 27.4, label: "Classic" },
					{ y: 8.5, label: "Modern" },
					{ y: 3.4, label: "Historique" },
					{ y: 10.8, label: "Drama" },

				]
			}],
            height:250,

		}
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
