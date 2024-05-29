/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@angular/core';
import { DietObjective, DietType, ExerciseType, Gender, SelectItemDTO } from 'src/models/models-classes';

@Injectable()
export class EnumsService {
  dietTypesEnums = this.enumToArray(DietType);
  dietObjectiveEnums = this.enumToArray(DietObjective);
  gendersEnums = this.enumToArray(Gender);
  exerciseEnums = this.enumToArray(ExerciseType);

  private enumToArray<T extends object>(enumeration: T): T[keyof T][] {
    return Object.keys(enumeration)
      .filter(k => isNaN(Number(k)))
      .map(k => enumeration[k]);
  }

  getBooleanForSelect(): SelectItemDTO<boolean>[] {
    return [
      { label: 'Si', sublabel: '', value: true, disabled: false },
      { label: 'No', sublabel: '', value: false, disabled: false },
    ];
  }

  getDietTypesForSelect(): SelectItemDTO<DietType>[] {
    return this.dietTypesEnums.map(value => {
      return { value, label: this.getDietTypesStatusLabel(value), disabled: false, sublabel: '' };
    });
  }

  getDietTypesStatusLabel(dietType: DietType) {
    switch (dietType) {
      case DietType.Carnivore:
        return 'Carnivora';
      case DietType.Mediterranean:
        return 'Mediterránea';
      case DietType.Omnivore:
        return 'Omnivora';
      case DietType.Vegan:
        return 'Vegana';
      case DietType.Vegetarian:
        return 'Vegetariana';
      case DietType.Paleo:
        return 'Paleo';
      default:
        return '';
    }
  }

  getDietObjectivesForSelect(): SelectItemDTO<DietObjective>[] {
    return this.dietObjectiveEnums.map(value => {
      return { value, label: this.getDietObjectiveLabel(value), disabled: false, sublabel: '' };
    });
  }

  getDietObjectiveLabel(dietObjective: DietObjective) {
    switch (dietObjective) {
      case DietObjective.MantainWeight:
        return 'Mantener peso';
      case DietObjective.GainWeight:
        return 'Subir de peso';
      case DietObjective.LoseWeight:
        return 'Perder peso';
      default:
        return '';
    }
  }

  getGendersForSelect(): SelectItemDTO<Gender>[] {
    return this.gendersEnums.map(value => {
      return { value, label: this.getGenderLabel(value), disabled: false, sublabel: '' };
    });
  }

  getGenderLabel(gender: Gender) {
    switch (gender) {
      case Gender.Female:
        return 'Mujer';
      case Gender.Male:
        return 'Hombre';
      default:
        return '';
    }
  }

  getExerciseTypesForSelect(): SelectItemDTO<ExerciseType>[] {
    return this.exerciseEnums.map(value => {
      return { value, label: this.getExerciseTypeLabel(value), disabled: false, sublabel: '' };
    });
  }

  getExerciseTypeLabel(exercise: ExerciseType) {
    switch (exercise) {
      case ExerciseType.Arm:
        return 'Brazo';
      case ExerciseType.Leg:
        return 'Pierna';
      case ExerciseType.Cardio:
        return 'Cardio';
      case ExerciseType.Chest:
        return 'Pecho';
      case ExerciseType.Back:
        return 'Espalda';
      case ExerciseType.Gluteus:
        return 'Glúteos';
      default:
        return '';
    }
  }
}
