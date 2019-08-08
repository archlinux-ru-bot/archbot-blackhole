import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import * as moment from 'moment';
import config from '../../config';

const OPEN_DATE_UNIX = moment.utc(config.open_date).valueOf();

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
		this.updateCounter(this.getNeededDate());
	}

	openDownloadDialog() {
		this.dialog.open(DownloadDialog);
	}

	isCounterNeed() {
		let openDateDiff = moment().diff(OPEN_DATE_UNIX);

		if(moment().isBefore(OPEN_DATE_UNIX)) {
			if(moment.duration(openDateDiff).months() === 0) {
				return true;
			} else {
				return false;
			}
		} else {
			if(config.counter_after_release) {
				return true;
			} else {
				return false;
			}
		}
	}

	getNeededDate() {
		let dateToDiff = 0;

		if(moment().isBefore(OPEN_DATE_UNIX)) {
			dateToDiff = OPEN_DATE_UNIX;
		} else {
			dateToDiff = this.generateDate();
		}

		return dateToDiff;
	}

	generateDate() {
		let isFuture = Math.random() >= 0.5;
		let thisYear = moment().year();
		let thisMonth = moment().month();
		let randomDay = 0;
		let randomHour = Math.round(Math.random() * 24);

		if(isFuture) {
			randomDay = Math.round(Math.random() * moment().daysInMonth()) + moment().date();

			if(randomDay > moment().daysInMonth()) {
				randomDay = randomDay - (randomDay - moment().daysInMonth());
			}
		} else {
			randomDay = Math.round(Math.random() * (moment().date() - 1));
		}

		return moment([thisYear, thisMonth, randomDay, randomHour, 0 ,0]).valueOf();
	}

	updateCounter(dateToDiff) {
		this.needCounter = this.isCounterNeed();

		if(config.nan_counter_after_release && !moment().isBefore(OPEN_DATE_UNIX)) {
			this.displayedDateDiff.days = NaN;
			this.displayedDateDiff.hours = NaN;
			this.displayedDateDiff.minutes = NaN;
			this.displayedDateDiff.seconds = NaN;
		} else {
			const dateDiff = moment().diff(dateToDiff);
			const dateDuration = moment.duration(dateDiff);
			this.displayedDateDiff.days = -dateDuration.days();
			this.displayedDateDiff.hours = -dateDuration.hours();
			this.displayedDateDiff.minutes = -dateDuration.minutes();
			this.displayedDateDiff.seconds = -dateDuration.seconds();
		}

		setTimeout(() => this.updateCounter.call(this, dateToDiff), 1000);
	}
}

@Component({
	selector: 'app-home-download-dialog',
	templateUrl: 'download.dialog.html',
})
export class DownloadDialog {
	isBeforeOpenDate = moment().isBefore(OPEN_DATE_UNIX);

	constructor(public dialogRef: MatDialogRef<DownloadDialog>) {}

	onAccept() {
		window.open('https://github.com/archlinux-ru-bot/archlinux_ru_bot');
		this.dialogRef.close();
	}
}
