import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	subjDescriptionMobileStyle = {'text-align': 'center'};
	customerReviewFlex = '0 1 calc(50% - 16px)';
	dateDiff: any = {};
	ngOnInit() {
		this.updateDateDiff([2019, 7, 22, 23, 0, 0]);
	}

	updateDateDiff(date) {
		const dateDiff = moment().diff(date);
		const dateDuration = moment.duration(dateDiff);
		this.dateDiff.days = -dateDuration.days();
		this.dateDiff.hours = -dateDuration.hours();
		this.dateDiff.minutes = -dateDuration.minutes();
		this.dateDiff.seconds = -dateDuration.seconds();

		setTimeout(() => this.updateDateDiff.call(this, date), 1000);
	}
}
