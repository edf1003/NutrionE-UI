import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { DietObjective, DietType, Gender, SelectItemDTO, UserDTO } from 'src/models/models-classes';
import { EnumsService } from 'src/services/enums.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss'],
})
export class EditUserModalComponent implements OnInit {
  genders: SelectItemDTO<Gender>[];
  dietTypes: SelectItemDTO<DietType>[];
  dietObjectives: SelectItemDTO<DietObjective>[];

  dataForm = this.formBuilder.group({
    name: [undefined as string, Validators.required],
    email: [undefined as string, Validators.required],
    age: [undefined as number, Validators.required],
    gender: [undefined as Gender, Validators.required],
    dietType: [undefined as DietType, Validators.required],
    height: [undefined as number, Validators.required],
    weight: [undefined as number, Validators.required],
    basalMetabolism: [undefined as number, Validators.required],
    dietObjective: [undefined as DietObjective, Validators.required],
  });

  get user() {
    return this.usersService.currentUser;
  }

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private modalRef: MdbModalRef<EditUserModalComponent>,
    private enumsService: EnumsService,
  ) {}

  ngOnInit(): void {
    this.resetForm();
    this.genders = this.enumsService.getGendersForSelect();
    this.dietTypes = this.enumsService.getDietTypesForSelect();
    this.dietObjectives = this.enumsService.getDietObjectivesForSelect();
  }

  resetForm() {
    this.dataForm.reset({
      name: this.user.name,
      email: this.user.email,
      age: this.user.age,
      height: this.user.height,
      weight: this.user.weight,
      basalMetabolism: this.user.basalMetabolism,
      dietObjective: this.user.dietObjective,
      dietType: this.user.dietType,
      gender: this.user.gender,
    });
  }

  close() {
    this.modalRef.close();
  }

  submitForm() {
    const toSend: UserDTO = {
      age: this.dataForm.controls.age.value,
      dietObjective: this.dataForm.controls.dietObjective.value,
      dietType: this.dataForm.controls.dietType.value,
      email: this.dataForm.controls.email.value,
      basalMetabolism: this.dataForm.controls.basalMetabolism.value,
      enrollmentDate: this.user.enrollmentDate,
      gender: this.dataForm.controls.gender.value,
      height: this.dataForm.controls.height.value,
      id: this.user.id,
      name: this.dataForm.controls.name.value,
      weight: this.dataForm.controls.weight.value,
    };

    this.usersService.updateUser(toSend).subscribe({
      next: rsp => {
        this.usersService.currentUser = rsp;
      },
    });
    this.close();
  }
}
