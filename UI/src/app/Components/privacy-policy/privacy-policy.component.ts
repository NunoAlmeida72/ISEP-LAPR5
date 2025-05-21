import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent {
  constructor(
    public dialogRef: MatDialogRef<PrivacyPolicyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onDeclineClick(): void {
    this.dialogRef.close(false);
  }

  onAcceptClick(): void {
    this.dialogRef.close(true);
  }
}
