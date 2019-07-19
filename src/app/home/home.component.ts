import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import * as moment from 'moment';

const COUNTER_AFTER_RELEASE = true;
const OPEN_DATE = moment.utc([2019, 6, 22, 19, 0, 0]).valueOf();

let loadMoment = moment();

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	needCounter = false;
	displayedDateDiff: any = {};
	subjDescriptionMobileStyle = {'text-align': 'center'};
	customerReviewFlex = '0 1 calc(50% - 16px)';

	constructor(public dialog: MatDialog) {}

	ngOnInit() {
		this,this.initCoutner();
		this.updateDateDiff(this.getNeededDate());
	}

	openDownloadDialog() {
		this.dialog.open(DownloadDialog);
	}

	initCoutner() {
		let openDateDiff = loadMoment.diff(OPEN_DATE);

		if(loadMoment.isBefore(OPEN_DATE)) {
			if(moment.duration(openDateDiff).months() === 0) {
				this.needCounter = true;
			}
		} else {
			if(COUNTER_AFTER_RELEASE) {
				this.needCounter = true;
			}
		}
	}

	getNeededDate() {
		let dateToDiff = 0;

		if(loadMoment.isBefore(OPEN_DATE)) {
			dateToDiff = OPEN_DATE;
		} else {
			dateToDiff = this.generateDate();
		}

		return dateToDiff;
	}

	generateDate() {
		let isFuture = Math.random() >= 0.5;
		let thisYear = loadMoment.year();
		let thisMonth = loadMoment.month();
		let randomDay = 0;
		let randomHour = Math.round(Math.random() * 24);

		if(isFuture) {
			randomDay = Math.round(Math.random() * loadMoment.daysInMonth()) + loadMoment.date();

			if(randomDay > loadMoment.daysInMonth()) {
				randomDay = randomDay - (randomDay - loadMoment.daysInMonth());
			}
		} else {
			randomDay = Math.round(Math.random() * (loadMoment.date() - 1));
		}

		return moment([thisYear, thisMonth, randomDay, randomHour, 0 ,0]).valueOf();
	}

	updateDateDiff(dateToDiff) {
		const dateDiff = moment().diff(dateToDiff);
		const dateDuration = moment.duration(dateDiff);
		this.displayedDateDiff.days = -dateDuration.days();
		this.displayedDateDiff.hours = -dateDuration.hours();
		this.displayedDateDiff.minutes = -dateDuration.minutes();
		this.displayedDateDiff.seconds = -dateDuration.seconds();

		setTimeout(() => this.updateDateDiff.call(this, dateToDiff), 1000);
	}
}

@Component({
	selector: 'app-home-download-dialog',
	templateUrl: 'download.dialog.html',
})
export class DownloadDialog {
	isBeforeOpenDate = loadMoment.isBefore(OPEN_DATE);

	constructor(public dialogRef: MatDialogRef<DownloadDialog>) {}

	onAccept() {
		window.open('https://github.com/archlinux-ru-bot/archlinux_ru_bot');
		this.dialogRef.close();
	}
}
