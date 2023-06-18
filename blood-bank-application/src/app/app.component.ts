import { Component } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

interface BloodGroup {
  name: string;
  count: number;
  highlight: boolean; // New property
}

interface Bucket {
  bloodGroup: BloodGroup;
  quantity: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  bloodGroups: BloodGroup[] = [
    { name: 'A+', count: 10, highlight: false },
    { name: 'B+', count: 8, highlight: false },
    { name: 'O+', count: 5, highlight: false },
    { name: 'AB+', count: 3, highlight: false },
    { name: 'A-', count: 7, highlight: false },
    { name: 'B-', count: 6, highlight: false },
    { name: 'O-', count: 4, highlight: false },
    { name: 'AB-', count: 2, highlight: false },
  ];

  selectedBloodRequired!: string;
  selectedBottles!: number | undefined;

  bottlesOptions: number[] = [];

  buckets: Bucket[] = [];

  ngOnInit() {
    this.selectedBloodRequired = this.bloodGroups[0].name;
    this.selectedBottles = this.bloodGroups[0].count;
  }

  getBottleOptions(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i + 1);
  }

  onBloodRequiredChanged() {
    const selectedGroup = this.bloodGroups.find(
      (group) => group.name === this.selectedBloodRequired
    );
    if (selectedGroup) {
      this.bottlesOptions = this.getBottleOptions(selectedGroup.count);
      if (this.selectedBottles && this.selectedBottles > selectedGroup.count) {
        this.selectedBottles = undefined;
      }
    }
    this.updateDonorGroups();
  }

  onBottlesChanged() {
    const selectedGroup = this.bloodGroups.find(
      (group) => group.name === this.selectedBloodRequired
    );
    if (selectedGroup && this.selectedBottles) {
      this.updateBloodBankCount();

      const bucket: Bucket = {
        bloodGroup: selectedGroup,
        quantity: this.selectedBottles,
      };

      this.buckets.push(bucket);
      this.selectedBloodRequired = ''; // Reset selected blood group
      this.selectedBottles = undefined; // Reset selected bottles

      this.updateDonorGroups();
    }
  }

  updateDonorGroups() {
    this.bloodGroups.forEach((group) => {
      const bucket = this.buckets.find(
        (bucket) => bucket.bloodGroup.name === group.name
      );
      group.highlight = bucket ? group.count >= bucket.quantity : false;
    });
  }

  onDrop(event: CdkDragDrop<BloodGroup[]>) {
    const droppedGroup: BloodGroup = event.item.data;
    if (droppedGroup.name === this.selectedBloodRequired) {
      this.updateBloodBankCount();

      const bucket: Bucket = {
        bloodGroup: droppedGroup,
        quantity: this.selectedBottles || 1,
      };
      this.buckets.push(bucket);

      this.updateDonorGroups();
    }
  }

  getRemainingCount(): number {
    const selectedGroup = this.bloodGroups.find(
      (group) => group.name === this.selectedBloodRequired
    );
    if (selectedGroup && this.selectedBottles !== undefined) {
      return selectedGroup.count - this.selectedBottles;
    }
    return 0;
  }

  getBloodBankCount(): number | undefined {
    const selectedGroup = this.bloodGroups.find(
      (group) => group.name === this.selectedBloodRequired
    );
    if (selectedGroup && this.selectedBottles) {
      return selectedGroup.count - this.selectedBottles;
    }
    return undefined;
  }

  updateBloodBankCount() {
    const selectedGroup = this.bloodGroups.find(
      (group) => group.name === this.selectedBloodRequired
    );
    if (selectedGroup && this.selectedBottles) {
      selectedGroup.count -= this.selectedBottles;
      if (selectedGroup.count < 0) {
        selectedGroup.count = 0;
      }
    }
  }
}
