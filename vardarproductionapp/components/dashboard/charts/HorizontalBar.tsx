"use client";
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { TbBackground } from 'react-icons/tb';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function HorizontalBar() {

	const options = {
		title: {
			text: "Statistique d'efficacité",
			fontFamily: "Arial", // Specify the font family
			fontSize: 24, // Specify the font size
			fontWeight: "bold", // Specify the font weight (e.g., "normal", "bold")
			fontColor: "#000000", // Specify the font color

		},
		toolTip: {
			shared: true
		},
		legend: {
			verticalAlign: "top"
		},

		data: [{
			type: "stackedBar100",
			color: "#8003a2",
			name: "Women",
			showInLegend: false,
			indexLabel: "{y}",
			indexLabelFontColor: "white",
			yValueFormatString: "#,###'%'",
			dataPoints: [
				{ label: "Nbr des affecters qui  nous ont contacté", y: 65 },
				{ label: "Nbr Prospects affecté", y: 55 },
				{ label: "Nbr Prospects Des Campagnes Terminée", y: 90 },
			]
		}, {
			type: "stackedBar100",
			color: "#e3a9f2",
			name: "Men",
			showInLegend: false,
			indexLabel: "{y}",
			indexLabelFontColor: "white",
			yValueFormatString: "#,###'%'",
			dataPoints: [
				{ label: "Nbr des affecters qui  nous ont contacté", y: 35 },
				{ label: "Nbr Prospects affecté", y: 45 },
				{ label: "Nbr Prospects Des Campagnes Terminée", y: 10 },
			]
		}],
		
		height: 300,
		backgroundColor: "transparent",
		axisY: {
			suffix: "%",
			gridThickness: 0,    
		},
	};

	return (
			<div> {/* Ensure chart respects these dimensions */}
				<CanvasJSChart options={options} />
			</div>
	);

}


